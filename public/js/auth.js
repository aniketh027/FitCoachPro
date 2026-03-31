document.addEventListener("DOMContentLoaded", () => {

  const registerForm = document.getElementById("registerForm");
  const loginForm    = document.getElementById("loginForm");
  const forgotForm   = document.getElementById("forgotForm");
  const resetForm    = document.getElementById("resetForm");

  // ── TOGGLE PASSWORD ──
  window.togglePassword = function (id, icon) {
    const input = document.getElementById(id);
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    icon.innerHTML = isPassword
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>`;
  };

  // ── REGISTER ──
  if (registerForm) {
    // Pre-fill email if coming from login "not found" modal
    const params = new URLSearchParams(window.location.search);
    const prefill = params.get("email");
    if (prefill) {
      const emailInput = document.getElementById("email");
      if (emailInput) {
        emailInput.value = decodeURIComponent(prefill);
        // Focus password field since email is already filled
        document.getElementById("password")?.focus();
      }
    }

    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email           = document.getElementById("email").value;
      const password        = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (!email || !password || !confirmPassword)
        return showToast("All fields are required", "warning");
      if (password !== confirmPassword)
        return showToast("Passwords do not match", "error");
      if (password.length < 6)
        return showToast("Password must be at least 6 characters", "warning");

      try {
        const res  = await fetch("/api/auth/register", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("token", data.token);
          showToast("Account created! Let's set up your profile.", "success");
          setTimeout(() => window.location.replace("onboarding.html"), 1000);
        } else {
          showToast(data.msg || "Registration failed", "error");
        }
      } catch (err) {
        showToast("Server error. Please try again.", "error");
      }
    });
  }

  // ── LOGIN ──
  if (loginForm) {
    const notFoundModal = document.getElementById("notFoundModal");
    const modalEmail    = document.getElementById("modalEmail");
    const modalYesBtn   = document.getElementById("modalYesBtn");
    const modalNoBtn    = document.getElementById("modalNoBtn");

    let lastEmail = "";

    // Close modal — "No, try again"
    modalNoBtn?.addEventListener("click", () => {
      notFoundModal.classList.remove("open");
      document.getElementById("password").value = "";
      document.getElementById("password").focus();
    });

    // Confirm — "Yes, register me" → go to register with email prefilled
    modalYesBtn?.addEventListener("click", () => {
      window.location.href = "register.html?email=" + encodeURIComponent(lastEmail);
    });

    // Close modal if clicking outside the box
    notFoundModal?.addEventListener("click", (e) => {
      if (e.target === notFoundModal) {
        notFoundModal.classList.remove("open");
      }
    });

    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email    = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (!email || !password)
        return showToast("Please fill in all fields", "warning");

      try {
        const res  = await fetch("/api/auth/login", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (res.ok && data.token) {
          localStorage.setItem("token", data.token);
          showToast("Welcome back!", "success");
          setTimeout(() => window.location.replace("dashboard.html"), 800);

        } else if (data.msg === "User does not exist") {
          // Show professional modal instead of confirm()
          lastEmail = email;
          modalEmail.innerText = email;
          notFoundModal.classList.add("open");

        } else {
          showToast(data.msg || "Login failed", "error");
        }

      } catch (err) {
        showToast("Server error. Please try again.", "error");
      }
    });
  }

  // ── FORGOT PASSWORD ──
  if (forgotForm) {
    forgotForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      if (!email) return showToast("Please enter your email", "warning");

      try {
        const res  = await fetch("/api/auth/forgot-password", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ email })
        });
        const data = await res.json();
        showToast(data.msg, "info");
      } catch (err) {
        showToast("Server error. Please try again.", "error");
      }
    });
  }

  // ── RESET PASSWORD ──
  if (resetForm) {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) showToast("Invalid or missing reset link", "error");

    resetForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const newPassword     = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (newPassword !== confirmPassword)
        return showToast("Passwords do not match", "error");
      if (newPassword.length < 6)
        return showToast("Password must be at least 6 characters", "warning");

      try {
        const res  = await fetch("/api/auth/reset-password", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ token, newPassword })
        });
        const data = await res.json();

        if (res.ok) {
          showToast("Password reset! Redirecting to login…", "success");
          setTimeout(() => window.location.replace("login.html"), 2000);
        } else {
          showToast(data.msg || "Reset failed", "error");
        }
      } catch (err) {
        showToast("Server error. Please try again.", "error");
      }
    });
  }

});