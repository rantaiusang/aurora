// config.js
const PI_APP_ID = "aurora-4c073a664f9faa3a"; 
const IS_SANDBOX = true; 
const LOGIN_TIMEOUT_MS = 15000; // 15 detik timeout

function initPiSDK() {
  if (typeof window.Pi === "undefined") return false;
  if (window.__PI_INITIALIZED__) return true;
  try {
    Pi.init({ version: "2.0", appId: PI_APP_ID, sandbox: IS_SANDBOX });
    window.__PI_INITIALIZED__ = true;
    return true;
  } catch (err) {
    console.error("Init Error:", err);
    return false;
  }
}

function isSandboxMode() {
    return IS_SANDBOX;
}

// FUNGSI YANG TADI HILANG / ERROR
async function authenticateWithTimeout(scopes, onIncompletePaymentFound) {
    console.log("[PiSDK] Memulai authenticate...");
    const authPromise = new Promise((resolve, reject) => {
        Pi.authenticate(scopes, onIncompletePaymentFound).then(resolve).catch(reject);
    });
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Waktu habis (Timeout). Server lambat merespon."));
        }, LOGIN_TIMEOUT_MS);
    });
    return await Promise.race([authPromise, timeoutPromise]);
}
