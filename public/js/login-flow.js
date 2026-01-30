// login-flow.js

// Kita bungkus dalam IIFE agar variabel lokal tidak mencemari window, 
// tapi kita tetap expose runLoginProcess ke window.
(function() {
    console.log("📂 [File] login-flow.js sedang dimuat...");

    async function runLoginProcess() {
        try {
            console.log("🚀 [Step 1] Fungsi runLoginProcess jalan...");
            
            // --- CEK 1: Pastikan APP_CONFIG Ada ---
            if (typeof window.APP_CONFIG === 'undefined') {
                throw new Error("Konfigurasi (pi-config.js) belum dimuat. Cek urutan script HTML.");
            }

            // --- CEK 2: Pastikan startPiAuth Ada ---
            if (typeof window.startPiAuth !== 'function') {
                throw new Error("Modul Autentikasi (pi-auth.js) belum dimuat.");
            }

            // Update UI
            const statusEl = document.getElementById("main-status");
            if(statusEl) statusEl.innerText = "Autentikasi Pi...";

            // Jalankan Auth (panggil fungsi dari pi-auth.js)
            const auth = await window.startPiAuth();
            console.log("✅ [Step 2] Sukses dapat Auth:", auth);

            if (!auth || !auth.user || !auth.accessToken) {
                throw new Error("Login Pi dibatalkan atau token kosong");
            }

            if(statusEl) statusEl.innerText = "Mengecek Database...";

            // --- CEK 3: Validasi URL API ---
            if (!window.APP_CONFIG.API_URL) {
                throw new Error("API_URL belum diatur di pi-config.js");
            }

            // Kirim ke Backend Supabase
            const res = await fetch(window.APP_CONFIG.API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": window.APP_CONFIG.SUPABASE_ANON_KEY,
                    "Authorization": `Bearer ${window.APP_CONFIG.SUPABASE_ANON_KEY}`
                },
                body: JSON.stringify({
                    uid: auth.user.uid,
                    username: auth.user.username,
                    accessToken: auth.accessToken,
                    isSandbox: window.APP_CONFIG.IS_SANDBOX
                })
            });

            const data = await res.json();
            console.log("✅ [Step 3] Respon Backend:", data);

            if (!res.ok || data.success !== true) {
                throw new Error(data.message || "Verifikasi backend gagal");
            }

            // Simpan User
            localStorage.setItem("aurora_user", JSON.stringify(auth.user));
            
            // Redirect ke Store
            console.log("Redirecting to store.html...");
            location.href = "store.html";

        } catch (err) {
            console.error("❌ [ERROR] Terjadi kesalahan di login-flow:", err);
            
            // Tampilkan Error di Layar
            const errorBox = document.getElementById("error-box");
            const errorMsg = document.getElementById("error-msg");
            const spinnerAnim = document.getElementById("spinnerAnim"); // Sembunyikan spinner saat error
            
            if (spinnerAnim) spinnerAnim.style.display = 'none';

            if (errorBox && errorMsg) {
                errorBox.style.display = "block";
                errorMsg.innerText = err.message;
            } else {
                alert("Error System: " + err.message);
            }
        }
    }

    // Expose fungsi ke window agar bisa dipanggil HTML
    window.runLoginProcess = runLoginProcess;
})();
