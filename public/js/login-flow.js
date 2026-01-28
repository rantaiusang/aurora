// login-flow.js

async function runLoginProcess() {
  try {
    console.log("[Step 1] Memulai Pi Auth...");
    const auth = await startPiAuth();

    if (!auth || !auth.user || !auth.accessToken) {
      throw new Error("Login Pi dibatalkan atau token tidak diterima");
    }

    console.log("[Step 2] Mengirim data ke Backend...", auth.user.uid);
    
    // PERBAIKAN: Langsung gunakan APP_CONFIG.API_URL
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

    if (!res.ok || data.success !== true) {
      console.error("Backend Error:", data);
      throw new Error(data.message || "Verifikasi backend gagal");
    }

    // Simpan sesi user
    localStorage.setItem("aurora_user", JSON.stringify(auth.user));

    console.log("[Success] Login Berhasil. Mengalihkan...");
    
    // ✅ LOGIN SUKSES
    location.href = "store.html";

  } catch (err) {
    console.error("[LOGIN FATAL ERROR]", err);
    
    // Tampilkan error ke UI jika elemennya ada
    const errorBox = document.getElementById("error-box");
    const errorMsg = document.getElementById("error-msg");
    
    if (errorBox && errorMsg) {
      errorBox.style.display = "block";
      errorMsg.innerText = err.message;
    }
    
    // Jangan throw error lagi agar UI tidak crash, biarkan user baca pesan error
  }
}

window.runLoginProcess = runLoginProcess;
