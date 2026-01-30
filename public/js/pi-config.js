<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Login - Aurora Store</title>
    
    <!-- Font & Styles (Sama seperti sebelumnya) -->
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@300;500&display=swap" rel="stylesheet">
    <style>
        :root { --luxury-gold: #d4af37; --dark-bg: #0f0c15; --dark-card: #161616; --text-gray: #888; --text-white: #fff; --luxury-red: #8a1c1c; }
        body { background: var(--dark-bg); color: var(--text-white); font-family: 'Poppins', sans-serif; margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .card { background: var(--dark-card); padding: 40px; border-radius: 20px; text-align: center; border: 1px solid rgba(212,175,55,0.2); width: 90%; max-width: 400px; }
        h1 { font-family: 'Playfair Display', serif; margin-bottom: 20px; }
        .status { margin-bottom: 20px; color: var(--text-gray); font-size: 0.9rem; min-height: 1.5em; }
        .spinner { border: 3px solid rgba(255,255,255,0.1); border-top: 3px solid var(--luxury-gold); border-radius: 50%; width: 30px; height: 30px; animation: spin 1s linear infinite; margin: 0 auto 15px; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .error-box { display: none; background: rgba(138,28,28,0.2); padding: 10px; border-radius: 8px; color: #ff9999; font-size: 0.85rem; margin-top: 15px; border: 1px solid rgba(138,28,28,0.5); }
        .btn-retry { display: none; margin-top: 15px; padding: 10px 20px; background: var(--luxury-gold); border: none; border-radius: 20px; cursor: pointer; color: #000; font-weight: bold; }
    </style>

    <!-- 1. Load Pi SDK -->
    <script src="https://sdk.minepi.com/pi-sdk.js"></script>

    <!-- 2. Load Config (Sumber Sandbox & API) -->
    <script src="pi-config.js"></script>
</head>
<body>

    <div class="card">
        <div class="spinner" id="spinner"></div>
        <h1 id="main-text">Menghubungkan...</h1>
        <p class="status" id="sub-text">Menyiapkan koneksi aman</p>
        
        <div id="error-box" class="error-box"></div>
        <button id="btn-retry" class="btn-retry" onclick="runLoginProcess()">Coba Lagi</button>
    </div>

    <script>
        // --- LOGIKA LOGIN (Full di HTML) ---

        async function runLoginProcess() {
            const ui = {
                spinner: document.getElementById('spinner'),
                mainText: document.getElementById('main-text'),
                subText: document.getElementById('sub-text'),
                errorBox: document.getElementById('error-box'),
                btnRetry: document.getElementById('btn-retry')
            };

            // Reset UI
            ui.spinner.style.display = 'block';
            ui.errorBox.style.display = 'none';
            ui.btnRetry.style.display = 'none';
            ui.mainText.innerText = "Menghubungkan...";
            ui.subText.innerText = "Inisialisasi Pi SDK";

            try {
                // 1. AMBIL SANDBOX DARI PI-CONFIG.JS
                // Kita gunakan nilai ?? true sebagai cadangan jika config gagal load
                const isSandbox = (window.APP_CONFIG && window.APP_CONFIG.IS_SANDBOX) !== undefined 
                                  ? window.APP_CONFIG.IS_SANDBOX 
                                  : true;

                console.log("Mode Sandbox:", isSandbox);

                // 2. INISIALISASI SDK
                // Catatan: Jika Anda memakai App ID tertentu, tambahkan appId: "..." di dalam objek ini
                await Pi.init({ 
                    version: "2.0", 
                    sandbox: isSandbox 
                });

                ui.subText.innerText = "Meminta izin login...";

                // 3. OTENTIKASI
                const authResult = await Pi.authenticate(['username'], {
                    onIncompletePaymentFound: (payment) => {
                        console.log("Pembayaran tertunda:", payment);
                    }
                });

                console.log("Auth Berhasil:", authResult);

                if (!authResult || !authResult.accessToken) {
                    throw new Error("Gagal mendapatkan token akses.");
                }

                ui.mainText.innerText = "Verifikasi...";
                ui.subText.innerText = "Mengecek ke database server";

                // 4. KIRIM KE BACKEND (SUPABASE)
                const apiUrl = window.APP_CONFIG ? window.APP_CONFIG.API_URL : "";
                
                if (!apiUrl) throw new Error("URL API tidak ditemukan di config.");

                const res = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "apikey": window.APP_CONFIG.SUPABASE_ANON_KEY,
                        "Authorization": `Bearer ${window.APP_CONFIG.SUPABASE_ANON_KEY}`
                    },
                    body: JSON.stringify({
                        uid: authResult.user.uid,
                        username: authResult.user.username,
                        accessToken: authResult.accessToken,
                        isSandbox: isSandbox
                    })
                });

                const data = await res.json();

                if (!res.ok || !data.success) {
                    throw new Error(data.message || "Server menolak login.");
                }

                // 5. SUKSES & REDIRECT
                localStorage.setItem("aurora_user", JSON.stringify(authResult.user));
                ui.mainText.innerText = "Berhasil!";
                ui.spinner.style.display = 'none';
                
                setTimeout(() => {
                    window.location.href = "store.html";
                }, 1000);

            } catch (err) {
                console.error(err);
                ui.spinner.style.display = 'none';
                ui.mainText.innerText = "Login Gagal";
                ui.subText.innerText = "";
                
                ui.errorBox.style.display = 'block';
                ui.errorBox.innerText = err.message;
                ui.btnRetry.style.display = 'inline-block';
            }
        }

        // Jalankan otomatis saat halaman load
        window.addEventListener('load', () => {
            // Delay sedikit agar Pi SDK pasti siap
            setTimeout(runLoginProcess, 500);
        });

    </script>
</body>
</html>
