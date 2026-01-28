function initPiSDK() {
  if (!window.Pi || !window.PI_CONFIG) {
    console.error("[PiSDK] SDK / config belum siap");
    return false;
  }

  if (window.__PI_INITIALIZED__) return true;

  Pi.init({
    version: PI_CONFIG.VERSION,
    sandbox: PI_CONFIG.SANDBOX
  });

  window.__PI_INITIALIZED__ = true;
  console.log("[PiSDK] Init OK | Sandbox:", PI_CONFIG.SANDBOX);
  return true;
}

window.initPiSDK = initPiSDK;
