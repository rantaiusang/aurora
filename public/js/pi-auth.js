async function piLogin() {
  if (!initPiSDK()) throw "Pi Browser wajib";

  const auth = await Pi.authenticate(['username'], () => {});
  console.log("LOGIN OK", auth);
  return auth;
}

window.piLogin = piLogin;
