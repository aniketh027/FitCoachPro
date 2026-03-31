// ─────────────────────────────────────────
//  TOAST NOTIFICATION SYSTEM
//  Usage:
//    showToast("Saved successfully!", "success")
//    showToast("Something went wrong", "error")
//    showToast("Check your email", "info")
//    showToast("Fill all fields", "warning")
// ─────────────────────────────────────────

(function () {

  // Create container once
  function getContainer() {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }
    return container;
  }

  const icons = {
    success: "✅",
    error:   "❌",
    info:    "ℹ️",
    warning: "⚠️"
  };

  window.showToast = function (message, type = "info", duration = 4000) {
    const container = getContainer();

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || "ℹ️"}</span>
      <span class="toast-msg">${message}</span>
    `;

    // Click to dismiss early
    toast.addEventListener("click", () => toast.remove());

    container.appendChild(toast);

    // Auto remove after duration
    setTimeout(() => {
      toast.remove();
    }, duration);
  };

})();