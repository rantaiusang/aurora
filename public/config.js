// config.js
const PI_APP_ID = "aurora-4c073a664f9faa3a"; // SLUG / APP ID
const IS_SANDBOX = true; 

function initPiSDK() {
    if (typeof Pi === "undefined") {
        console.warn("Pi SDK tidak terdeteksi. Buka via Pi Browser.");
        return false;
    }

    if (Pi._isInitialized) return true;

    // ==========================================
    // PERBAIKAN KRUSIAL: TAMBAHKAN appId
    // ==========================================
    Pi.init({
        version: "2.0",
        appId: PI_APP_ID,   // <--- INI WAJIB ADA
        sandbox: IS_SANDBOX
    });

    Pi._isInitialized = true;
    console.log("Pi SDK initialized | sandbox:", IS_SANDBOX);
    return true;
}
