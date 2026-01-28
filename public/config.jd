// config.js
const PI_APP_ID = "aurora-4c073a664f9faa3a"; // dari slug Pi App
const IS_SANDBOX = true; // true = testnet, false = mainnet

function initPiSDK() {
    if (typeof Pi === "undefined") {
        console.warn("Pi SDK tidak terdeteksi. Pastikan membuka melalui Pi Browser.");
        return false;
    }

    if (Pi._isInitialized) return true;

    Pi.init({
        version: "2.0",
        appId: PI_APP_ID,
        sandbox: IS_SANDBOX
    });

    Pi._isInitialized = true;
    console.log("Pi SDK berhasil di-init. Sandbox:", IS_SANDBOX);
    return true;
}
