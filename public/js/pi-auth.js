// pi-auth.js
async function startPiAuth() {
  if (!initPiSDK()) {
    throw new Error("Pi SDK gagal diinisialisasi. Pastikan tidak ada pemblokir iklan.");
  }

  // Melakukan autentikasi Pi Network
  // Callback kosong () => {} dibolehkan jika kita handle via Promise
  try {
    const authResult = await Pi.authenticate(['username'], {
      onIncompletePaymentFound: (payment) => { 
        // Opsional: Handle jika ada pembayaran tertunda
        console.log("Pembayaran tertunda ditemukan", payment); 
      }
    });
    return authResult;
  } catch (err) {
    throw new Error("Otentikasi Pi ditolak oleh user: " + err.message);
  }
}

window.startPiAuth = startPiAuth;
