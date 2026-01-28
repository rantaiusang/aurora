// config.js
const PI_APP_ID = "aurora-4c073a664f9faa3a";   // ganti dengan App ID resmi Pi
const IS_SANDBOX = true;              // true = testnet/sandbox, false = mainnet

// Fungsi inisialisasi Pi SDK
function initPiSDK() {
    if (typeof Pi === "undefined") {
        alert("Pi SDK tidak terdeteksi. Wajib buka via Pi Browser.");
        throw new Error("Pi SDK not loaded");
    }

    Pi.init({
        version: "2.0",
        appId: PI_APP_ID,
        sandbox: IS_SANDBOX
    });

    console.log("Pi SDK Berhasil Di-Initialize. Sandbox:", IS_SANDBOX);
}
