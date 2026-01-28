function initPiSDK() {
  if (!window.Pi) {
    console.error("Pi SDK belum siap");
    return false;
  }

  if (window.__PI_INITIALIZED__) return true;

  Pi.init({
    version: "2.0",
    sandbox: APP_CONFIG.IS_SANDBOX
  });

  window.__PI_INITIALIZED__ = true;
  return true;
}

window.initPiSDK = initPiSDK;
