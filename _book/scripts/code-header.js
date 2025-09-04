document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("pre > code").forEach(code => {
    const pre = code.parentElement;

    // Create header
    const header = document.createElement("div");
    header.className = "code-header";

    // Mac-style lights
    const lights = document.createElement("span");
    lights.className = "lights";
    lights.innerHTML = "<i></i><i></i><i></i>";

    // Label (language if available)
    const label = document.createElement("span");
    label.className = "label";
    label.textContent = code.className.replace("hljs", "").trim() || "code";

    // Spacer
    const spacer = document.createElement("span");
    spacer.className = "spacer";

    // Copy button
    const button = document.createElement("button");
    button.className = "copy-btn";
    button.textContent = "Copy";
    button.addEventListener("click", () => {
      navigator.clipboard.writeText(code.innerText);
      button.textContent = "Copied!";
      setTimeout(() => (button.textContent = "Copy"), 2000);
    });

    // Assemble
    header.append(lights, label, spacer, button);
    pre.insertBefore(header, code);
  });
});
