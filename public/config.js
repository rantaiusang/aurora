// config.js (Versi Perbaikan)

const PI_APP_ID = "aurora-4c073a664f9faa3a"; 
const IS_SANDBOX = true; 

function initPiSDK() {
    // Cek apakah SDK sudah ada
    if (typeof Pi === "undefined") {
        console.warn("[Config] Pi SDK belum siap. Menunggu...");
        return false; // JANGAN LANJUT jika SDK belum ada
    }

    // Cek apakah sudah pernah di-init sebelumnya
    if (Pi._isInitialized) return true;

    console.log("[Config] SDK Siap. Melakukan Init...");
    
    // Jalankan Init
    Pi.init({
        version: "2.0",
        appId: PI_APP_ID, // Pastikan appId disertakan
        sandbox: IS_SANDBOX
    });

    Pi._isInitialized = true;
    return true;
}
