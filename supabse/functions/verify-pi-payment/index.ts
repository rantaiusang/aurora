import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// INI PANGGIL SDK PI (IMPORT LOKAL FILE YANG BARU DIBUAT)
import Pi from './pi-sdk-wrapper';

// KONFIGURASI
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const piApiKey = Deno.env.get('PI_API_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const Pi = new Pi(piApiKey); // Inisialisasi SDK

// FUNGSI UTAMA (SAMA)
serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { orderData, items } = await req.json();

    // SIMULASI PEMBAYARAN
    const payment = await Pi.createPayment({
      amount: orderData.total,
      memu: "Pembayaran Aurora Store",
      metadata: {
        orderId: orderData.orderId,
        customer: orderData.name
      }
    });

    // SIMPAN KE DATABASE
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        order_id: orderData.orderId,
        customer_name: orderData.name,
        customer_phone: orderData.phone,
        customer_address: orderData.address,
        payment_txid: payment.identifier,
        total_amount: parseFloat(orderData.total),
        items: items,
        status: 'paid'
      }])
      .select();

    if (error) {
      console.error("Gagal Simpan:", error);
      throw new Error("Gagal menyimpan pesanan.");
    }

    return new Response(JSON.stringify({ 
      success: true, 
      paymentId: payment.identifier 
    }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Error Edge Function:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
});
