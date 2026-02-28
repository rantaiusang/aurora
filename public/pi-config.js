/**
 * pi-config.js - FIXED VERSION
 */

window.APP_CONFIG = {
    // Pastikan ini sesuai dengan di Dashboard Pi Developers
    IS_SANDBOX: true, 

    // Ganti dengan Key yang sebenarnya (jangan lupa keep secret!)
    SUPABASE_ANON_KEY: "ANON_KEY_KAMU", 

    ENDPOINTS: {
        // Untuk Login
        LOGIN: "https://dikapquhusbwjccbqcsb.functions.supabase.co/verify-pi-login",
        
        // UNTUK MEMBUAT TRANSAKSI (Baru ini ditambahkan)
        CREATE_PAYMENT: "https://dikapquhusbwjccbqcsb.functions.supabase.co/create-pi-payment",
        
        // Ini adalah Webhook yang dipanggil OTOMATIS oleh Pi Network setelah user klik Approve
        // (Biasanya tidak dipanggil manual oleh Frontend, tapi didaftarkan di Dashboard Pi)
        COMPLETE_PAYMENT: "https://dikapquhusbwjccbqcsb.functions.supabase.co/verify-pi-payment" 
    }
};
