// ===============================
// PI SDK CONFIG
// ===============================
const PI_APP_ID = "aurora-4c073a664f9faa3a";
const IS_SANDBOX = true;
const LOGIN_TIMEOUT_MS = 15000;

// ===============================
// INIT SDK
// ===============================
function initPiSDK() {
  if (typeof window.Pi === "undefined") {
    console.error("[PiSDK] Pi Browser tidak terdeteksi");
    return false;
  }

  if (window.__PI_INITIALIZED__) return true;

  try {
    Pi.init({
  version: "2.0",
  sandbox: IS_SANDBOX
});


    window.__PI_INITIALIZED__ = true;
    console.log("[PiSDK] Initialized");
    return true;

  } catch (err) {
    console.error("[PiSDK] Init error:", err);
    return false;
  }
}

// ===============================
// SANDBOX CHECK
// ===============================
function isSandboxMode() {
  return IS_SANDBOX;
}

// ===============================
// AUTH WITH TIMEOUT
// ===============================
async function authenticateWithTimeout(scopes, onIncompletePaymentFound) {
  if (!initPiSDK()) {
    throw new Error("Pi SDK belum siap. Gunakan Pi Browser.");
  }

  console.log("[PiSDK] Memulai authenticate...");

  const authPromise = Pi.authenticate(scopes, onIncompletePaymentFound);

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Waktu habis. Silakan coba lagi."));
    }, LOGIN_TIMEOUT_MS);
  });

  return Promise.race([authPromise, timeoutPromise]);
}

// ===============================
// EXPORT KE GLOBAL
// ===============================
window.initPiSDK = initPiSDK;
window.authenticateWithTimeout = authenticateWithTimeout;
window.PI_IS_SANDBOX = IS_SANDBOX;
