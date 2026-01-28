async function runLoginProcess() {
  const auth = await startPiAuth();

  const res = await fetch(
    `${APP_CONFIG.SUPABASE_URL}/functions/v1/${APP_CONFIG.FUNCTION_NAME}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": APP_CONFIG.SUPABASE_ANON_KEY
      },
      body: JSON.stringify({
        uid: auth.user.uid,
        username: auth.user.username,
        accessToken: auth.accessToken,
        isSandbox: APP_CONFIG.IS_SANDBOX
      })
    }
  );

  if (!res.ok) throw new Error("Backend error");

  localStorage.setItem("aurora_user", JSON.stringify(auth.user));
  location.href = "store.html";
}

window.runLoginProcess = runLoginProcess;
