/**
 * pi-config.js - MASTER CONFIGURATION
 * Version: 2.0 (Koklais Optimized)
 * 
 * File ini adalah "otak" dari koneksi aplikasi Anda ke Pi Network.
 * Pastikan ANON_KEY dan URL sudah benar sebelum deploy.
 */

window.APP_CONFIG = {
    
    // ==========================================
    // 1. ENVIRONMENT SETTINGS
    // ==========================================
    
    // UBAH KE 'false' JIKA SUDAH SIAP LIVE DI MAINNET
    // Pastikan mengubah App Type di developers.pi.net juga
    IS_SANDBOX: true, 

    // Kunci Keamanan Supabase (Public Anon Key)
    // Dapatkan dari: Project Settings > API > anon public
    SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpa2FwcXVodXNid2pjY2JxY3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNjQ1NTQsImV4cCI6MjA4NDc0MDU1NH0.X278oHDF0be7oa25484eliSukSYAYvDbJyU6ysz83zA", 
    // ^^^ GANTI KEY DI ATAS DENGAN KEY ASLI ANDA ^^^


    // ==========================================
    // 2. API ENDPOINTS (BACKEND CONNECTIONS)
    // ==========================================
    
    // Base URL untuk semua fungsi Supabase Anda
    BASE_URL: "https://dikapquhusbwjccbqcsb.functions.supabase.co",

    ENDPOINTS: {
        // Endpoint untuk Login / Verifikasi User Auth
        LOGIN: "/verify-pi-login",

        // Endpoint untuk MEMBUAT invoice pembayaran (Dipanggil SEBELUM dialog muncul)
        CREATE_PAYMENT: "/create-pi-payment",

        // Endpoint untuk VERIFIKASI pembayaran (Webhook / Callback)
        // Biasanya: /verify-pi-payment atau /complete-pi-payment
        VERIFY_PAYMENT: "/verify-pi-payment",

        // Endpoint tambahan (Opsional) untuk mengecek status transaksi
        CHECK_STATUS: "/check-payment-status"
    },


    // ==========================================
    // 3. PI NETWORK PROTOCOL SETTINGS
    // ==========================================

    PI: {
        // Versi SDK yang digunakan
        SDK_VERSION: "2.0",
        
        // Daftar permission yang diminta kepada user
        SCOPES: ["payments", "username"],
        
        // Timeout request (dalam milidetik)
        REQUEST_TIMEOUT: 25000 
    },


    // ==========================================
    // 4. APPLICATION UI & LOGIC
    // ==========================================
    
    APP: {
        NAME: "Aurora Parfumerie",
        CURRENCY_CODE: "PI", // Simbol mata uang
        CURRENCY_DECIMALS: 2, // Jumlah desimal tampilan (0.00)
        
        // Pengaturan Cart
        CART_STORAGE_KEY: "aurora_cart",
        CHECKOUT_STORAGE_KEY: "aurora_checkout",
        USER_STORAGE_KEY: "aurora_user",
        
        // Jumlah maksimal item dalam keranjang
        MAX_CART_ITEMS: 10
    }

};

/**
 * ==========================================
 * 🔧 SYSTEM HELPERS (JANGAN DIUBAH)
 * ==========================================
 */

// Helper untuk mendapatkan URL lengkap secara dinamis
window.getAppUrl = function(endpointKey) {
    const baseUrl = window.APP_CONFIG.BASE_URL;
    const endpoint = window.APP_CONFIG.ENDPOINTS[endpointKey];
    
    if (!baseUrl || !endpoint) {
        console.error(`Config Error: Endpoint ${endpointKey} tidak ditemukan.`);
        return "#";
    }
    
    // Hapus garis miring ganda jika ada
    return baseUrl.replace(/\/+$/, '') + endpoint.replace(/^\/+/, '');
};

// Debugging Log
console.log("🔥 Koklais Config Loaded:", {
    Env: window.APP_CONFIG.IS_SANDBOX ? "SANDBOX" : "MAINNET",
    Endpoints: window.APP_CONFIG.ENDPOINTS
});
