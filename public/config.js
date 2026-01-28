// config.js (VERSI PERBAIKAN)

const PI_APP_ID = "aurora-4c073a664f9faa3a"; 
const IS_SANDBOX = true; 

function initPiSDK() {
    // Cek apakah objek Pi sudah ada di window
    if (typeof Pi === "undefined") {
        console.warn("[Config] Pi SDK belum terdeteksi. Pastikan loading SDK selesai.");
        return false;
    }

    try {
        // Lakukan inisialisasi langsung. 
        // SDK Pi Network biasanya aman dipanggil berulang atau hanya dijalankan sekali.
        console.log("[Config] Melakukan inisialisasi SDK...");
        
        Pi.init({
            version: "2.0",
            appId: PI_APP_ID,
            sandbox: IS_SANDBOX
        });
        
        console.log("[Config] SDK Berhasil di-init.");
        return true;
    } catch (error) {
        console.error("[Config] Error saat init SDK:", error);
        return false;
    }
}
