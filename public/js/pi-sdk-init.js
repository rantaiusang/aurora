// pi-sdk-init.js
function initPiSDK() {
  if (!window.Pi) {
    console.error("Pi SDK belum siap");
    return false;
  }

  if (window.__PI_INITIALIZED__) return true;

  // Coba hapus 'version: "2.0"' dan biarkan default
  Pi.init({
    sandbox: window.APP_CONFIG?.IS_SANDBOX ?? true
    // Hapus baris version agar menggunakan versi yang paling stabil sesuai browser
  });

  window.__PI_INITIALIZED__ = true;
  console.log("Pi SDK Initialized (Default Version)");
  return true;
}

window.initPiSDK = initPiSDK;
