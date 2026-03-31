const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

async function selectLevel(level) {
  try {
    const res = await fetch("/api/users/set-level", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ level })
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
      return;
    }

    if (res.ok) {
      window.location.href = "style.html";
    } else {
      alert("Failed to save level");
    }

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}
