/* 1delta — Sidebar UX (simple)
   - Caret-only toggle
   - Stable per-item keys
   - Persists expanded items
*/
require(["gitbook", "jquery"], (gitbook, $) => {
  const STORAGE_KEY = "sidebar:expanded:v3";

  const load = () => {
    try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")); }
    catch { return new Set(); }
  };
  const save = (set) => localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));

  // Prefer HonKit/GitBook attributes for stable keys
  function keyFor($li) {
    const path  = $li.attr("data-path");
    const level = $li.attr("data-level");
    if (path)  return `path:${path}`;
    if (level) return `level:${level}`;
    // Fallback: index path in the tree
    const indices = [];
    let cur = $li;
    while (cur.length) {
      indices.unshift(cur.index());
      cur = cur.parent().closest("li.chapter");
    }
    return `idx:${indices.join(".")}`;
  }

  function restore() {
    const expanded = load();
    $(".book-summary .summary li.chapter.has-children").each(function () {
      const $li = $(this);
      const $ul = $li.children("ul.articles");
      const $a  = $li.children("a").first();
      const key = keyFor($li);

      if (expanded.has(key)) {
        $li.addClass("expanded");
        $ul.show();
        $a.attr("aria-expanded", "true");
      } else {
        $li.removeClass("expanded");
        $ul.hide();
        $a.attr("aria-expanded", "false");
      }
    });
  }

  function bind() {
    const expanded = load();
    // Toggle ONLY when the caret is clicked, not the whole link
    $(".book-summary .summary").on("click", "li.chapter.has-children > a .caret", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const $a  = $(this).closest("a");
      const $li = $a.parent("li.chapter");
      const $ul = $li.children("ul.articles");
      const key = keyFor($li);
      const open = $li.hasClass("expanded");

      if (open) {
        $li.removeClass("expanded");
        $ul.slideUp(120);
        $a.attr("aria-expanded", "false");
        expanded.delete(key);
      } else {
        $li.addClass("expanded");
        $ul.slideDown(120);
        $a.attr("aria-expanded", "true");
        expanded.add(key);
      }
      save(expanded);
    });
  }

  function expandActiveAncestors() {
    const expanded = load();
    $(".book-summary .summary li.active")
      .parents("li.chapter.has-children")
      .each(function () {
        const $li = $(this);
        const $ul = $li.children("ul.articles");
        const $a  = $li.children("a").first();
        $li.addClass("expanded");
        $ul.show();
        $a.attr("aria-expanded", "true");
        expanded.add(keyFor($li));
      });
    save(expanded);
  }

  gitbook.events.bind("start", () => {
    restore();
    bind();
    expandActiveAncestors();
  });

  gitbook.events.bind("page.change", () => {
    restore();
    expandActiveAncestors();
  });
});
