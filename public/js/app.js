// =========================
// TOKEN + 401 HELPER
// =========================

const token = localStorage.getItem("token");

function handleUnauthorized(res) {
  if (res.status === 401) {
    localStorage.removeItem("token");
    showToast("Session expired. Please log in again.", "warning");
    setTimeout(() => window.location.replace("login.html"), 1500);
    return true;
  }
  return false;
}

// =========================
// DASHBOARD PAGE
// =========================

// ── Logout (works on any page that has #logoutBtn) ──
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.replace("/");
});

if (window.location.pathname.includes("dashboard.html")) {

  if (!token) window.location.replace("login.html");

  async function checkOnboarding() {
    const res = await fetch("/api/users/me", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (handleUnauthorized(res)) return;
    if (!res.ok) {
      localStorage.removeItem("token");
      return window.location.replace("login.html");
    }

    const user = await res.json();

    if (!user.name || !user.gender || !user.age || !user.weight ||
      !user.height || !user.level || !user.style || !user.trainingType) {
      return window.location.replace("onboarding.html");
    }

    // Populate navbar avatar + name
    const navAvatar = document.getElementById("navAvatar");
    const navName = document.getElementById("navName");
    if (navAvatar) navAvatar.src = user.profilePic || "/images/default-avatar.svg";
    if (navName) navName.innerText = user.name;

    document.getElementById("navbar").style.display = "";
    document.getElementById("mainContent").style.display = "";

    loadPlan();
    fetchWorkouts();
    fetchStats();
  }

  checkOnboarding();

  async function loadPlan() {
    const res = await fetch("/api/workouts/plan", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (handleUnauthorized(res)) return;
    const plan = await res.json();
    if (!plan.length) return;

    const box = document.createElement("div");
    box.innerHTML = "<h3>Your Personalized Workout Plan</h3>";
    plan.forEach(p => {
      const line = document.createElement("p");
      line.innerText = `${p.exercise} — ${p.sets} x ${p.reps}`;
      box.appendChild(line);
    });
    document.querySelector(".container").prepend(box);
  }

  const workoutForm = document.getElementById("workoutForm");
  const workoutList = document.getElementById("workoutList");
  const workoutCount = document.getElementById("workoutCount");

  async function fetchStats() {
    const res = await fetch("/api/workouts/stats", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (handleUnauthorized(res)) return;
    const data = await res.json();
    workoutCount.innerText = data.totalWorkouts || 0;
  }

  async function fetchWorkouts() {
    const res = await fetch("/api/workouts", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (handleUnauthorized(res)) return;
    const workouts = await res.json();
    workoutList.innerHTML = "";
    workouts.forEach(w => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p>${w.exercise} - ${w.sets} x ${w.reps}</p>
        <button onclick="deleteWorkout('${w._id}')">Delete</button>
      `;
      workoutList.appendChild(div);
    });
  }

  workoutForm?.addEventListener("submit", async e => {
    e.preventDefault();

    const exerciseVal = document.getElementById("exercise").value.trim();
    const setsVal = document.getElementById("sets").value;
    const repsVal = document.getElementById("reps").value;

    if (!exerciseVal) return showToast("Please enter an exercise name", "warning");

    const res = await fetch("/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        exercise: exerciseVal,
        sets: Number(setsVal),
        reps: Number(repsVal)
      })
    });

    if (handleUnauthorized(res)) return;

    if (res.ok) {
      showToast("Workout logged!", "success");
      workoutForm.reset();
      fetchWorkouts();
      fetchStats();
    } else {
      showToast("Failed to save workout", "error");
    }
  });

  window.deleteWorkout = async id => {
    const res = await fetch(`/api/workouts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (handleUnauthorized(res)) return;
    if (res.ok) {
      showToast("Workout deleted", "info");
      fetchWorkouts();
      fetchStats();
    }
  };
}


// =========================
// PROFILE PAGE
// =========================

if (window.location.pathname.includes("profile.html")) {

  if (!token) window.location.replace("login.html");

  const profileForm = document.getElementById("profileForm");
  const profileView = document.getElementById("profileView");
  const editCard = document.getElementById("editCard");
  const backBtn = document.getElementById("backBtn");

  async function loadProfile() {
    const res = await fetch("/api/users/me", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (handleUnauthorized(res)) return;
    const user = await res.json();

    // Populate navbar
    const navAvatar = document.getElementById("navAvatar");
    const navName = document.getElementById("navName");
    if (navAvatar) navAvatar.src = user.profilePic || "/images/default-avatar.svg";
    if (navName) navName.innerText = user.name || "";
    document.getElementById("navbar").style.display = "";

    if (user.name) {
      profileView.style.display = "block";
      editCard.style.display = "none";
      backBtn.style.display = "inline-flex";

      // Hero card
      document.getElementById("vName").innerText = user.name;
      document.getElementById("vGenderTag").innerText = user.gender
        ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
        : "—";
      document.getElementById("vAgeTag").innerText = user.age ? user.age + " yrs" : "—";

      // Stats row
      document.getElementById("vWeight").innerText = user.weight || "—";
      document.getElementById("vHeight").innerText = user.height || "—";

      // BMI
      if (user.weight && user.height) {
        const bmi = (user.weight / Math.pow(user.height / 100, 2)).toFixed(1);
        let cat = "Underweight";
        if (bmi >= 18.5) cat = "Normal weight";
        if (bmi >= 25) cat = "Overweight";
        if (bmi >= 30) cat = "Obese";
        document.getElementById("vBmi").innerText = bmi;
        document.getElementById("vBmiTag").innerText = "BMI " + bmi + " · " + cat;
      }

      // Profile pic
      const picImg = document.getElementById("profilePicImg");
      const picPreview = document.getElementById("profilePicPreview");
      const src = user.profilePic || "/images/default-avatar.svg";
      if (picImg) { picImg.src = src; picImg.style.display = "block"; }
      if (picPreview) picPreview.src = src;

      // Pre-fill the edit form with current values
      if (window._prefillForm) window._prefillForm(user);

    } else {
      // No profile yet — go straight to edit form
      profileView.style.display = "none";
      editCard.style.display = "block";
      backBtn.style.display = "none";
    }
  }

  loadProfile();

  backBtn?.addEventListener("click", () => window.location.replace("dashboard.html"));

  // Open edit form
  document.getElementById("editBtn")?.addEventListener("click", () => {
    profileView.style.display = "none";
    editCard.style.display = "block";
    backBtn.style.display = "none";
  });

  // Save profile
  profileForm?.addEventListener("submit", async e => {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const genderInput = document.getElementById("gender");
    const ageInput = document.getElementById("age");
    const weightInput = document.getElementById("weight");
    const heightInput = document.getElementById("height");

    if (!nameInput.value || !genderInput.value || !ageInput.value ||
      !weightInput.value || !heightInput.value) {
      return showToast("All fields are required", "warning");
    }

    const res = await fetch("/api/users/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: nameInput.value,
        gender: genderInput.value,
        age: Number(ageInput.value),
        weight: Number(weightInput.value),
        height: Number(heightInput.value)
      })
    });

    if (handleUnauthorized(res)) return;

    if (res.ok) {
      showToast("Profile saved!", "success");
      // Return to view mode and refresh displayed data
      editCard.style.display = "none";
      backBtn.style.display = "inline-flex";
      await loadProfile();
    } else {
      showToast("Failed to save profile", "error");
    }
  });

  // ── PROFILE PICTURE WITH CROPPER ──
  let cropper = null;

  const fileInput = document.getElementById("profilePicInput");
  const cropModal = document.getElementById("cropModal");
  const cropImage = document.getElementById("cropImage");
  const cropSaveBtn = document.getElementById("cropSaveBtn");
  const zoomSlider = document.getElementById("zoomSlider");

  document.getElementById("cropCancelBtn")?.addEventListener("click", closeCropModal);
  document.getElementById("cropCancelBtn2")?.addEventListener("click", closeCropModal);

  fileInput?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      return showToast("Only JPG, PNG or WEBP allowed", "warning");
    }
    if (file.size > 2 * 1024 * 1024) {
      return showToast("Image must be under 2MB", "warning");
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      cropImage.src = ev.target.result;
      openCropModal();
    };
    reader.readAsDataURL(file);
    fileInput.value = "";
  });

  function openCropModal() {
    cropModal.classList.add("open");
    if (cropper) { cropper.destroy(); cropper = null; }

    cropper = new Cropper(cropImage, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: "move",
      autoCropArea: 0.9,
      restore: false,
      guides: true,
      center: true,
      highlight: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
      toggleDragModeOnDblclick: false,
      ready() {
        zoomSlider.value = 0;
      }
    });
  }

  function closeCropModal() {
    cropModal.classList.remove("open");
    if (cropper) { cropper.destroy(); cropper = null; }
  }

  zoomSlider?.addEventListener("input", (e) => {
    if (cropper) cropper.zoomTo(parseFloat(e.target.value));
  });

  cropImage?.addEventListener("zoom", (e) => {
    if (zoomSlider) zoomSlider.value = e.detail.ratio;
  });

  cropSaveBtn?.addEventListener("click", async () => {
    if (!cropper) return;

    const canvas = cropper.getCroppedCanvas({ width: 400, height: 400 });

    canvas.toBlob(async (blob) => {
      closeCropModal();
      showToast("Uploading…", "info");

      const formData = new FormData();
      formData.append("profilePic", blob, "profile.jpg");

      const res = await fetch("/api/users/upload-pic", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      if (handleUnauthorized(res)) return;

      const data = await res.json();
      if (res.ok) {
        showToast("Profile picture updated!", "success");
        const newSrc = data.profilePic + "?t=" + Date.now();
        const picImg = document.getElementById("profilePicImg");
        const picPreview = document.getElementById("profilePicPreview");
        const navAvatar = document.getElementById("navAvatar");
        if (picImg) picImg.src = newSrc;
        if (picPreview) picPreview.src = newSrc;
        if (navAvatar) navAvatar.src = newSrc;
      } else {
        showToast(data.msg || "Upload failed", "error");
      }
    }, "image/jpeg", 0.9);
  });

  // ── CHANGE PASSWORD ──
  const changePwForm = document.getElementById("changePwForm");

  changePwForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPwInput").value;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return showToast("All password fields are required", "warning");
    }
    if (newPassword !== confirmPassword) {
      return showToast("New passwords do not match", "error");
    }
    if (newPassword.length < 6) {
      return showToast("New password must be at least 6 characters", "warning");
    }
    if (newPassword === currentPassword) {
      return showToast("Your new password cannot be the same as your current password", "warning");
    }

    const res = await fetch("/api/users/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword, newPassword })
    });

    if (handleUnauthorized(res)) return;

    const data = await res.json();
    if (res.ok) {
      showToast(data.msg, "success");
      changePwForm.reset();
    } else {
      showToast(data.msg || "Failed to change password", "error");
    }
  });
}