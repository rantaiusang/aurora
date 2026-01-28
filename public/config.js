const PI_APP_ID = "aurora-4c073a664f9faa3a";
const IS_SANDBOX = true;

let PI_INITIALIZED = false;

function initPiSDK() {
    if (typeof Pi === "undefined") {
        console.warn("[Config] Pi SDK belum tersedia");
        return false;
    }

    if (PI_INITIALIZED) return true;

    Pi.init({
        version: "2.0",
        appId: PI_APP_ID,
        sandbox: IS_SANDBOX
    });

    PI_INITIALIZED = true;
    console.log("[Config] Pi SDK siap");
    return true;
}
