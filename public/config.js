// config.js

// ==========================================
// KONFIGURASI UTAMA
// ==========================================
const PI_APP_ID = "aurora-4c073a664f9faa3a"; 

// ⬇️ LETAKAN SANDBOX DI SINI (Ubah ke false jika sudah rilis Mainnet)
const IS_SANDBOX = true; 

// ==========================================
// FUNGSI INISIALISASI SDK
// ==========================================
function initPiSDK() {
  // Cek apakah SDK sudah terload di browser
  if (typeof window.Pi === "undefined") {
    console.warn("[Config] Pi SDK belum terdeteksi oleh browser.");
    return false;
  }

  // Cegah inisialisasi ganda
  if (window.__PI_INITIALIZED__) {
    console.log("[Config] SDK sudah diinisialisasi sebelumnya.");
    return true;
  }

  try {
    console.log(`[Config] Memulai inisialisasi... Mode: ${IS_SANDBOX ? "SANDBOX" : "MAINNET"}`);
    
    // Melakukan Inisialisasi
    Pi.init({
      version: "2.0",
      appId: PI_APP_ID,
      sandbox: IS_SANDBOX
    });

    window.__PI_INITIALIZED__ = true;
    console.log("[Config] ✅ Pi SDK berhasil siap.");
    return true;
    
  } catch (err) {
    console.error("[Config] ❌ Gagal inisialisasi:", err);
    return false;
  }
}

// Helper untuk cek status
function isSandboxMode() {
  return IS_SANDBOX;
}
