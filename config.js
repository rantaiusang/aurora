// config.js
// --- KONFIGURASI APLIKASI PI ---
const PI_APP_ID = "aurora-4c073a664f9faa3a";   // Ganti dengan App ID resmi Pi
const IS_SANDBOX = true;                        // true = testnet/sandbox, false = mainnet

// --- FUNGSI INISIALISASI PI SDK ---
function initPiSDK() {
    // Cek apakah Pi SDK tersedia
    if (typeof Pi === "undefined") {
        console.warn("Pi SDK tidak terdeteksi. Pastikan membuka melalui Pi Browser.");
        return false;
    }

    // Cek apakah SDK sudah diinisialisasi sebelumnya
    if (Pi._isInitialized) {
        console.log("Pi SDK sudah di-initialize sebelumnya.");
        return true;
    }

    // Inisialisasi SDK
    Pi.init({
        version: "2.0",
        appId: PI_APP_ID,
        sandbox: IS_SANDBOX
    });

    // Tandai SDK sudah di-init agar tidak di-init ulang
    Pi._isInitialized = true;

    console.log("Pi SDK berhasil di-initialize. Sandbox:", IS_SANDBOX);
    return true;
}

// --- FUNGSI LOAD VALIDATION KEY ---
async function loadValidationKey() {
    try {
        const response = await fetch('/validation-key.txt'); // fetch dari folder public
        if (!response.ok) throw new Error("Gagal membaca validation key");
        const key = await response.text();
        console.log("Validation key berhasil dibaca:", key.trim());
        return key.trim();
    } catch (err) {
        console.error("Error load validation key:", err);
        return null;
    }
}
