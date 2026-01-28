// config.js (FINAL AMAN)

const PI_APP_ID = "aurora-4c073a664f9faa3a"; 
const IS_SANDBOX = true; 

function initPiSDK() {
    if (typeof window.Pi === "undefined") {
        console.warn("[Config] Pi SDK belum terdeteksi.");
        return false;
    }

    // ✅ CEGAH INIT ULANG
    if (window.__PI_INITIALIZED__) {
        return true;
    }

    try {
        console.log("[Config] Init Pi SDK...");
        Pi.init({
            version: "2.0",
            appId: PI_APP_ID,
            sandbox: IS_SANDBOX
        });

        window.__PI_INITIALIZED__ = true;
        console.log("[Config] Pi SDK siap.");
        return true;
    } catch (err) {
        console.error("[Config] Init gagal:", err);
        return false;
    }
}
