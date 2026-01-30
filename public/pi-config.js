/**
 * pi-config.js
 * File konfigurasi utama untuk Aurora Store Pi Network App.
 * File ini memuat URL API dan Key backend yang dibutuhkan oleh login.html.
 */

window.APP_CONFIG = {
    
    // --- PENGATURAN LINGKUNGAN (ENVIRONMENT) ---
    // Ubah ke 'true' jika sedang mengerjakan di Localhost/Komputer.
    // Ubah ke 'false' jika aplikasi sudah di-upload ke hosting (Production).
    IS_SANDBOX: true,

    // --- KONEKSI BACKEND (SUPABASE) ---
    // URL Edge Function Supabase Anda untuk verifikasi login
    API_URL: "https://dikapquhusbwjccbqcsb.supabase.co/functions/v1/verify-pi-login",

    // Kunci Publik Supabase (Anon Key) untuk mengizinkan akses frontend
    SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpa2FwcXVodXNid2pjY2JxY3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNjQ1NTQsImV4cCI6MjA4NDc0MDU1NH0.X278oHDF0be7oa25484eliSukSYAYvDbJyU6ysz83zA"
};
