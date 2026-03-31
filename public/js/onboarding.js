const token = localStorage.getItem("token");
if (!token) window.location.replace("login.html");

// ── STATE ──
const TOTAL_STEPS = 7;
let currentStep = 1;

const selections = {
  gender:      null,
  level:       null,
  style:       null,
  trainingType: null
};

// ── INIT ──
buildStepIndicators();
updateUI();

function buildStepIndicators() {
  const container = document.getElementById("stepIndicators");
  // Steps 1 and 7 (welcome + done) don't show dots
  for (let i = 2; i <= 6; i++) {
    const dot = document.createElement("div");
    dot.className = "step-dot";
    dot.id = `dot-${i}`;
    container.appendChild(dot);
  }
}

function updateUI() {
  // Show correct slide
  document.querySelectorAll(".slide").forEach(s => s.classList.remove("active"));
  document.querySelector(`[data-step="${currentStep}"]`).classList.add("active");

  // Progress bar — maps steps 1-7 to 0-100%
  const pct = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;
  document.getElementById("progressBar").style.width = pct + "%";

  // Step dots
  for (let i = 2; i <= 6; i++) {
    const dot = document.getElementById(`dot-${i}`);
    if (!dot) continue;
    dot.className = "step-dot";
    if (i < currentStep)      dot.classList.add("done");
    else if (i === currentStep) dot.classList.add("active");
  }
}

// ── NAVIGATION ──
function nextStep() {
  if (!validateStep(currentStep)) return;
  currentStep++;
  updateUI();
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateUI();
  }
}

// ── OPTION SELECTION ──
function selectOption(field, value, el) {
  selections[field] = value;

  // Deselect siblings
  el.closest("[id$='Options']")
    .querySelectorAll(".option-card, .big-option-card")
    .forEach(c => c.classList.remove("selected"));

  el.classList.add("selected");

  // Clear error
  const errEl = document.getElementById(`${field}Error`);
  if (errEl) errEl.innerText = "";
}

// ── VALIDATION ──
function validateStep(step) {
  let valid = true;

  function showErr(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.innerText = msg; }
    valid = false;
  }
  function clearErr(id) {
    const el = document.getElementById(id);
    if (el) el.innerText = "";
  }

  if (step === 2) {
    const name = document.getElementById("name").value.trim();
    const age  = document.getElementById("age").value;

    if (!name)              showErr("nameError",   "Please enter your name");
    else                    clearErr("nameError");

    if (!selections.gender) showErr("genderError", "Please select your gender");
    else                    clearErr("genderError");

    if (!age || age < 10 || age > 100) showErr("ageError", "Please enter a valid age");
    else                               clearErr("ageError");
  }

  if (step === 3) {
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;

    if (!weight || weight < 20) showErr("weightError", "Please enter a valid weight");
    else                        clearErr("weightError");

    if (!height || height < 100) showErr("heightError", "Please enter a valid height");
    else                         clearErr("heightError");
  }

  if (step === 4) {
    if (!selections.level) showErr("levelError", "Please select your fitness level");
    else                   clearErr("levelError");
  }

  if (step === 5) {
    if (!selections.style) showErr("styleError", "Please select a workout style");
    else                   clearErr("styleError");
  }

  if (step === 6) {
    if (!selections.trainingType) showErr("trainingError", "Please select where you'll train");
    else                          clearErr("trainingError");
  }

  return valid;
}

// ── LIVE BMI PREVIEW ──
function updateBMIPreview() {
  const weight  = parseFloat(document.getElementById("weight").value);
  const height  = parseFloat(document.getElementById("height").value);
  const preview = document.getElementById("bmiPreview");

  if (!weight || !height || height < 100) {
    preview.style.display = "none";
    return;
  }

  const h   = height / 100;
  const bmi = (weight / (h * h)).toFixed(1);

  let label, color;
  if      (bmi < 18.5) { label = "Underweight"; color = "#60a5fa"; }
  else if (bmi < 25)   { label = "Normal weight"; color = "#22c55e"; }
  else if (bmi < 30)   { label = "Overweight"; color = "#f59e0b"; }
  else                 { label = "Obese"; color = "#ef4444"; }

  // Marker position: BMI 10 = 0%, BMI 40 = 100%
  const pct = Math.min(Math.max(((bmi - 10) / 30) * 100, 2), 98);

  document.getElementById("bmiValue").innerText    = bmi;
  document.getElementById("bmiLabel").innerText    = label;
  document.getElementById("bmiValue").style.color  = color;
  document.getElementById("bmiBarMarker").style.left = pct + "%";

  preview.style.display = "block";
}

// ── FINAL SUBMIT ──
async function submitOnboarding() {
  if (!validateStep(6)) return;

  const name   = document.getElementById("name").value.trim();
  const age    = document.getElementById("age").value;
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;

  try {
    // Save profile
    const r1 = await fetch("/api/users/update-profile", {
      method:  "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body:    JSON.stringify({
        name,
        gender: selections.gender,
        age:    Number(age),
        weight: Number(weight),
        height: Number(height)
      })
    });
    if (r1.status === 401) { logout(); return; }

    // Save level
    const r2 = await fetch("/api/users/set-level", {
      method:  "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body:    JSON.stringify({ level: selections.level })
    });
    if (r2.status === 401) { logout(); return; }

    // Save style
    const r3 = await fetch("/api/users/set-style", {
      method:  "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body:    JSON.stringify({ style: selections.style })
    });
    if (r3.status === 401) { logout(); return; }

    // Save training type
    const r4 = await fetch("/api/users/set-training", {
      method:  "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body:    JSON.stringify({ trainingType: selections.trainingType })
    });
    if (r4.status === 401) { logout(); return; }

    // All saved — show done screen
    currentStep = 7;
    updateUI();

    setTimeout(() => window.location.replace("dashboard.html"), 2500);

  } catch (err) {
    console.error(err);
    showToast("Something went wrong. Please try again.", "error");
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.replace("/");
}