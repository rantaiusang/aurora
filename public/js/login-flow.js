// login-flow.js

async function runLoginProcess() {
  try {
    console.log("🚀 [Step 1] Fungsi runLoginProcess jalan...");
    
    // Coba ubah teks status manual agar kita tahu script jalan
    const statusEl = document.getElementById("main-status");
    if(statusEl) statusEl.innerText = "Autentikasi Pi...";

    const auth = await startPiAuth();
    console.log("✅ [Step 2] Sukses dapat Auth:", auth);

    if (!auth || !auth.user || !auth.accessToken) {
      throw new Error("Login Pi dibatalkan atau token kosong");
    }

    if(statusEl) statusEl.innerText = "Mengecek Database...";

    const res = await fetch(APP_CONFIG.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": APP_CONFIG.SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${APP_CONFIG.SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        uid: auth.user.uid,
        username: auth.user.username,
        accessToken: auth.accessToken,
        isSandbox: APP_CONFIG.IS_SANDBOX
      })
    });

    const data = await res.json();
    console.log("✅ [Step 3] Respon Backend:", data);

    if (!res.ok || data.success !== true) {
      throw new Error(data.message || "Verifikasi backend gagal");
    }

    localStorage.setItem("aurora_user", JSON.stringify(auth.user));
    location.href = "store.html";

  } catch (err) {
    console.error("❌ [ERROR] Terjadi kesalahan:", err);
    
    // Paksa tampilkan error di layar
    const errorBox = document.getElementById("error-box");
    const errorMsg = document.getElementById("error-msg");
    if (errorBox && errorMsg) {
      errorBox.style.display = "block";
      errorMsg.innerText = err.message;
    } else {
      alert("Error: " + err.message);
    }
  }
}

window.runLoginProcess = runLoginProcess;
