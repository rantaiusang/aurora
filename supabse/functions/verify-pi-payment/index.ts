import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// 1. KONFIGURASI ENV VARS
const SUPABASE_URL = Deno.env.get('https://dikapquhusbwjccbqcsb.supabase.co') ?? '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpa2FwcXVodXNid2pjY2JxY3NiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTE2NDU1NCwiZXhwIjoyMDg0NzQwNTU0fQ.kQ3VS6YKLvoVR3zZouapABzVcB5arbnGlGczgQdPHTQ') ?? '';
const PI_API_KEY = Deno.env.get('SB7ACRZW37BEABOUPMJ6TEIEKYJ6TXDCDRAHDAXW4BIBTTSUGFEE2TT7') ?? '';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

console.log("Edge Function Initialized: create_order");

// 2. HANDLER UTAMA
serve(async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      } 
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    // 3. AMBIL DATA DARI FRONTEND
    const body = await req.json();
    const { payment_id, txid, order_data } = body;

    // Validasi Input
    if (!payment_id || !txid || !order_data) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ success: false, error: 'Field payment_id, txid, atau order_data hilang.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Memverifikasi Payment ID: ${payment_id}`);

    // 4. VERIFIKASI KE PI NETWORK API
    const piApiUrl = `https://api.minepi.com/v2/payments/${payment_id}`;
    
    const piResponse = await fetch(piApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Key ${PI_API_KEY}`
      }
    });

    if (!piResponse.ok) {
      console.error("Gagal menghubungi Pi API");
      return new Response(
        JSON.stringify({ success: false, error: 'Gagal menghubungi Pi Network Server.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const piData = await piResponse.json();
    console.log("Data dari Pi Network:", piData);

    // 5. VALIDASI STATUS
    if (piData.status !== 'COMPLETED') {
      console.warn(`Payment belum selesai. Status: ${piData.status}`);
      return new Response(
        JSON.stringify({ success: false, error: `Pembayaran belum selesai. Status: ${piData.status}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Opsional: Cek kesesuaian TXID
    if (piData.transaction && piData.transaction.txid !== txid) {
       return new Response(
        JSON.stringify({ success: false, error: 'Data transaksi tidak valid (TXID mismatch).' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 6. SIMPAN KE SUPABASE
    const { data: insertData, error: insertError } = await supabase
      .from('orders')
      .insert([
        {
          order_id: order_data.orderId,
          customer_name: order_data.name,
          customer_phone: order_data.phone,
          customer_address: order_data.address,
          customer_wallet: order_data.wallet,
          payment_txid: txid, 
          total_amount: Number(order_data.total),
          items: order_data.cart,
          status: 'paid',
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (insertError) {
      console.error("Gagal insert ke Supabase:", insertError);
      return new Response(
        JSON.stringify({ success: false, error: 'Gagal menyimpan ke database.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log("Order Berhasil Disimpan:", insertData);

    // 7. RESPON SUKSES
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Order diverifikasi dan disimpan.",
        data: insertData
      }),
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' 
        } 
      }
    );

  } catch (error) {
    console.error("Edge Function Runtime Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
