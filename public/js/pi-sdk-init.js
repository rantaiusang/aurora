// pi-sdk-init.js
function initPiSDK() {
  // Cek apakah SDK sudah terload
  if (!window.Pi) {
    console.error("Pi SDK belum siap (script belum terload).");
    return false;
  }

  // Cek agar tidak init dua kali
  if (window.__PI_INITIALIZED__) return true;

  // Inisialisasi SDK
  Pi.init({
    version: "2.0",
    sandbox: window.APP_CONFIG?.IS_SANDBOX ?? true // Fallback ke true jika config tidak ada
  });

  window.__PI_INITIALIZED__ = true;
  console.log("Pi SDK Initialized:", APP_CONFIG?.IS_SANDBOX ? "SANDBOX" : "MAINNET");
  return true;
}

window.initPiSDK = initPiSDK;
