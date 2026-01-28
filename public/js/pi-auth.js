async function startPiAuth() {
  if (!initPiSDK()) {
    throw new Error("Pi SDK gagal init");
  }

  return Pi.authenticate(['username'], () => {});
}

window.startPiAuth = startPiAuth;
