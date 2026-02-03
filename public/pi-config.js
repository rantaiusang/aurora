/**
 * pi-config.js
 * File konfigurasi utama untuk Aurora Store Pi Network App.
 * Versi 2. Mendukung Login dan Payment Verification.
 */

window.APP_CONFIG = (function() {
    
    // --- PENGATURAN LINGKUNGAN (ENVIRONMENT) ---
    const IS_SANDBOX = true; // Ubah ke 'false' saat Production

    // --- KONEKSI BACKEND (SUPABASE) ---
    
    // Base URL Supabase Anda (Saya extract agar tidak mengetik ulang)
    const SUPABASE_BASE_URL = "https://dikapquhusbwjccbqcsb.supabase.co/functions/v1";

    // Konfigurasi Endpoint berdasarkan Environment
    const ENDPOINTS = {
        LOGIN: `${SUPABASE_BASE_URL}/verify-pi-login`,
        PAYMENT: `${SUPABASE_BASE_URL}/verify-pi-payment`
    };

    // Kunci Publik Supabase (Anon Key)
    // ⚠️ Pastikan Key ini valid dan tidak kadaluarsa.
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpa2FwcXVodXNid2pjY2JxY3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNjQ1NTQsImV4cCI6MjA4NDc0MDU1NH0.X278oHDF0be7oa25484eliSukSYAYvDbJyU6ysz83zA";

    // Debugging Log
    if (IS_SANDBOX) {
        console.log("[Config] Running in SANDBOX MODE");
        console.log("[Config] Login Endpoint:", ENDPOINTS.LOGIN);
        console.log("[Config] Payment Endpoint:", ENDPOINTS.PAYMENT);
    }

    // Export Config Object
    return {
        IS_SANDBOX,
        SUPABASE_ANON_KEY,
        ENDPOINTS // Mengembalikan objek endpoint agar mudah dipanggil (APP_CONFIG.ENDPOINTS.LOGIN)
    };

})();
