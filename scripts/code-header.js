// scripts/code-header.js
require(["gitbook", "jquery"], (gitbook, $) => {
  const aliasMap = {
    ts: "TypeScript", typescript: "TypeScript",
    js: "JavaScript", javascript: "JavaScript",
    jsx: "JSX", tsx: "TSX",
    json: "JSON", yml: "YAML", yaml: "YAML",
    bash: "Bash", sh: "Bash", shell: "Bash", zsh: "Bash", console: "Shell",
    sql: "SQL", toml: "TOML", ini: "INI", xml: "XML",
    html: "HTML", css: "CSS", scss: "SCSS",
    md: "Markdown", markdown: "Markdown", diff: "Diff",
    dockerfile: "Dockerfile", makefile: "Makefile",
    go: "Go", rust: "Rust", python: "Python", py: "Python",
    java: "Java", c: "C", cpp: "C++", csharp: "C#", cs: "C#",
    php: "PHP", ruby: "Ruby", swift: "Swift", kt: "Kotlin", kotlin: "Kotlin",
    solidity: "Solidity"
  };

  const getLangLabel = (codeEl) => {
    const cls = codeEl.className || "";
    const m1 = cls.match(/(^|\s)language-([a-z0-9+#-]+)(\s|$)/i);         // Prism
    if (m1) return aliasMap[m1[2].toLowerCase()] || cap(m1[2]);
    const m2 = cls.match(/(^|\s)(lang|language)-([a-z0-9+#-]+)(\s|$)/i);  // hljs
    if (m2) return aliasMap[m2[3].toLowerCase()] || cap(m2[3]);
    return "Code";
  };
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  function ensureHeaderFor(code) {
    const pre = code.parentElement;
    if (!pre) return;
    if (pre.querySelector(':scope > .code-header')) return; // already present

    // Build header
    const header = document.createElement("div");
    header.className = "code-header";

    const lights = document.createElement("span");
    lights.className = "lights";
    lights.innerHTML = "<i></i><i></i><i></i>";

    const label = document.createElement("span");
    label.className = "label";
    label.textContent = getLangLabel(code);

    const spacer = document.createElement("span");
    spacer.className = "spacer";

    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "Copy code");
    btn.textContent = "Copy";
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(code.innerText)
        .then(() => {
          const t = btn.textContent;
          btn.textContent = "Copied!";
          setTimeout(() => (btn.textContent = t), 1200);
        })
        .catch(() => {
          btn.textContent = "Error";
          setTimeout(() => (btn.textContent = "Copy"), 1200);
        });
    });

    header.append(lights, label, spacer, btn);
    pre.insertBefore(header, code);

    // ensure space for the header if CSS didn’t yet apply
    const curPadTop = parseFloat(getComputedStyle(code).paddingTop || "0");
    if (curPadTop < 40) {
      code.style.paddingTop = "44px"; // header (36px) + a little air
    }

    pre.setAttribute("data-lang", (label.textContent || "code").toLowerCase());
  }

  function addHeaders(context) {
    // cover Prism and hljs shapes
    const prism = context.querySelectorAll('pre[class*="language-"] > code[class*="language-"]');
    const hljs  = context.querySelectorAll('pre > code.hljs');

    const blocks = (prism.length || hljs.length) ? [...prism, ...hljs] : context.querySelectorAll("pre > code");
    blocks.forEach(ensureHeaderFor);
  }

  function runOnce() {
    const root = document.querySelector(".book .book-body") || document;
    addHeaders(root);

    // Observe late changes (Prism re-renders, page swaps, etc.)
    // Keep it lean: only watch subtree for <pre><code> changes
    const obs = new MutationObserver((mutations) => {
      let needs = false;
      for (const m of mutations) {
        if (m.type === "childList") {
          for (const n of m.addedNodes) {
            if (!(n instanceof Element)) continue;
            if (n.matches && (n.matches('pre[class*="language-"] > code[class*="language-"]') || n.matches('pre > code') || n.querySelector?.('pre > code'))) {
              needs = true; break;
            }
          }
        }
        if (needs) break;
      }
      if (needs) {
        // defer a frame to let Prism/layout finish
        requestAnimationFrame(() => addHeaders(root));
      }
    });

    obs.observe(root, { childList: true, subtree: true });
  }

  function schedule() {
    // Defer so Prism / content render completes before we inject
    requestAnimationFrame(() => setTimeout(runOnce, 0));
  }

  gitbook.events.bind("start", schedule);
  gitbook.events.bind("page.change", schedule);
});
