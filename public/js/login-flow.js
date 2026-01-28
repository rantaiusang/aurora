async function runLoginProcess() {
  try {
    const auth = await startPiAuth();

    if (!auth || !auth.user || !auth.accessToken) {
      throw new Error("Login Pi dibatalkan atau gagal");
    }

    const res = await fetch(
      `${APP_CONFIG.SUPABASE_URL}/functions/v1/${APP_CONFIG.FUNCTION_NAME}`,
      {
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
      }
    );

    const data = await res.json();

    if (!res.ok || data.success !== true) {
      throw new Error(data.message || "Verifikasi backend gagal");
    }

    localStorage.setItem(
      "aurora_user",
      JSON.stringify(auth.user)
    );

    // ✅ LOGIN SUKSES
    location.href = "store.html";

  } catch (err) {
    console.error("[LOGIN ERROR]", err);
    throw err; // biar UI bisa tangkap & tampilkan error
  }
}

window.runLoginProcess = runLoginProcess;
