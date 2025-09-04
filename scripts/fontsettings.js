/* 1delta — Font & Theme Settings (HonKit/GitBook style)
   - Syncs site-wide theme (white/sepia/night) with .color-theme-* classes
   - Syncs font family and size with .font-family-* / .font-size-*
   - Respects:
       1) URL override ?theme=night
       2) site defaults from book.json -> fontsettings
       3) prefers-color-scheme (only if no stored choice)
       4) persisted user choice via gitbook.storage ("fontState")
   - Adds toolbar dropdown with a11y & keyboard shortcuts.
*/
require(["gitbook", "jquery"], (gitbook, $) => {
  // ---- Config ----
  const MAX_SIZE = 4;
  const MIN_SIZE = 0;

  // Theme catalog (id order defines .color-theme-{id})
  // id: 0=white, 1=sepia, 2=night (matches your CSS and historical GitBook semantics)
  const THEMES = [
    { config: "white", text: "White", id: 0 },
    { config: "sepia", text: "Sepia", id: 1 },
    { config: "night", text: "Night", id: 2 }
  ];

  // Font families
  const FAMILIES = [
    { config: "serif", text: "Serif", id: 0 },
    { config: "sans",  text: "Sans",  id: 1 }
  ];

  // Runtime state
  let BUTTON_ID = null;
  let fontState = null;

  // ---- Helpers ----
  const getThemeId = (name) => {
    const match = THEMES.find(t => t.config === name);
    return (match && match.id) ?? 0;
  };
  const getFamilyId = (name) => {
    const match = FAMILIES.find(f => f.config === name);
    return (match && match.id) ?? 0;
  };

  // URL override: ?theme=night|sepia|white
  function readURLTheme() {
    const m = location.search.match(/[?&]theme=([a-z]+)/i);
    return m ? m[1].toLowerCase() : null;
  }

  // System preference (used only if no stored choice)
  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function applyClasses() {
    const $book = gitbook.state.$book;

    // Clean previous classes
    $book[0].className = $book[0].className
      .replace(/\bfont-size-\S+/g, "")
      .replace(/\bfont-family-\S+/g, "")
      .replace(/\bcolor-theme-\S+/g, "")
      .trim();

    // Apply new ones
    $book.addClass(`font-size-${fontState.size}`);
    $book.addClass(`font-family-${fontState.family}`);
    if (fontState.theme !== 0) { // 0 = white (no class for base)
      $book.addClass(`color-theme-${fontState.theme}`);
    }

    // Data attribute (handy for CSS hooks)
    $book.attr("data-theme", THEMES[fontState.theme].config);
    $book.attr("data-font-family", FAMILIES[fontState.family].config);
  }

  function persist() {
    gitbook.storage.set("fontState", fontState);
    applyClasses();
    gitbook.events.trigger("fontsettings:change", fontState);
  }

  function changeTheme(configName, e) {
    if (e && e.preventDefault) e.preventDefault();
    fontState.theme = getThemeId(configName);
    persist();
  }
  function changeFamily(configName, e) {
    if (e && e.preventDefault) e.preventDefault();
    fontState.family = getFamilyId(configName);
    persist();
  }
  function enlarge(e) {
    if (e) e.preventDefault();
    if (fontState.size < MAX_SIZE) {
      fontState.size++;
      persist();
    }
  }
  function reduce(e) {
    if (e) e.preventDefault();
    if (fontState.size > MIN_SIZE) {
      fontState.size--;
      persist();
    }
  }

  function initFromConfig(config) {
    const urlTheme = readURLTheme();                       // 1) URL
    const cfgFamily = getFamilyId(config.family || "sans");
    const cfgThemeName = urlTheme || (config.theme || "night"); // 2) site default (night)
    let cfgTheme = getThemeId(cfgThemeName);

    // 3) If no URL and no stored choice, consider system preference
    const stored = gitbook.storage.get("fontState", null);
    if (!stored && !urlTheme) {
      if (systemPrefersDark() && cfgTheme === 0) { // default was white but system is dark
        cfgTheme = getThemeId("night");
      }
    }

    fontState = stored || {
      size: typeof config.size === "number" ? config.size : 2,
      family: cfgFamily,
      theme: cfgTheme
    };

    applyClasses();
  }

  function buildToolbar() {
    // Remove existing
    if (BUTTON_ID) gitbook.toolbar.removeButton(BUTTON_ID);

    // Build dropdown groups
    const familyItems = FAMILIES.map(f => ({
      text: f.text,
      className: `font-family-${f.config}`,
      onClick: (e) => changeFamily(f.config, e)
    }));

    const themeItems = THEMES.map(t => ({
      text: t.text,
      className: `theme-${t.config}`,
      onClick: (e) => changeTheme(t.config, e)
    }));

    BUTTON_ID = gitbook.toolbar.createButton({
      icon: "fa fa-font",
      label: "Font & Theme",
      className: "font-settings",
      dropdown: [
        [
          { text: "A", className: "font-reduce", onClick: reduce,  attributes: { "aria-label": "Decrease font size" } },
          { text: "A", className: "font-enlarge", onClick: enlarge, attributes: { "aria-label": "Increase font size" } }
        ],
        familyItems,
        themeItems
      ]
    });

    // Mark active items
    const refreshActive = () => {
      $(".font-settings .font-family-" + FAMILIES[fontState.family].config).addClass("active")
        .siblings().removeClass("active");

      $(".font-settings .theme-" + THEMES[fontState.theme].config).addClass("active")
        .siblings().removeClass("active");
    };

    refreshActive();
    gitbook.events.on("fontsettings:change", refreshActive);
  }

  // Keyboard shortcuts:
  //   Alt+Shift+T : cycle theme
  //   Alt+Shift+= : enlarge
  //   Alt+Shift+- : reduce
  function bindShortcuts() {
    $(document).on("keydown", (e) => {
      const mod = e.altKey && e.shiftKey;
      if (!mod) return;

      switch (e.key) {
        case "T":
        case "t":
          e.preventDefault();
          fontState.theme = (fontState.theme + 1) % THEMES.length;
          persist();
          break;
        case "+":
        case "=": // some layouts need '='
          e.preventDefault();
          enlarge();
          break;
        case "_":
        case "-":
          e.preventDefault();
          reduce();
          break;
      }
    });
  }

  // GitBook lifecycle
  gitbook.events.bind("start", (_, config) => {
    // init order matters: classes first, then toolbar (so "active" reflects state)
    const opts = (config && config.fontsettings) || {};
    initFromConfig(opts);
    buildToolbar();
    bindShortcuts();
  });

  // API
  gitbook.fontsettings = {
    setTheme: changeTheme,
    setFamily: changeFamily,
    enlargeFontSize: enlarge,
    reduceFontSize: reduce,
    getThemes: () => THEMES.slice(),
    getFamilies: () => FAMILIES.slice()
  };
});
