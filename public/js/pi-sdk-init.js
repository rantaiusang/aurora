// pi-sdk-init.js

function initPiSDK() {
  // Cek 1: Apakah script Pi dari HTML sudah terload?
  if (!window.Pi) {
    console.error("Pi SDK tidak ditemukan! Cek koneksi internet atau adblocker.");
    alert("Gagal memuat Pi SDK. Matikan AdBlocker/VPN dan refresh halaman.");
    return false;
  }

  // Cek 2: Jangan inisialisasi 2x
  if (window.__PI_INITIALIZED__) {
    console.log("Pi SDK sudah terinisialisasi sebelumnya.");
    return true;
  }

  try {
    // Pastikan config terbaca
    const isSandbox = (typeof APP_CONFIG !== 'undefined') ? APP_CONFIG.IS_SANDBOX : true;

    Pi.init({
      version: "2.0",
      sandbox: isSandbox
    });

    window.__PI_INITIALIZED__ = true;
    console.log("✅ Pi SDK Sukses Init (Mode: " + (isSandbox ? "SANDBOX" : "MAINNET") + ")");
    return true;
  } catch (e) {
    console.error("Gagal saat menjalankan Pi.init:", e);
    return false;
  }
}

window.initPiSDK = initPiSDK;
