import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// JANGAN TULIS KEY DISINI
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''; 
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const supabase = createClient(supabaseUrl, supabaseKey);

// ... lanjut kode handler ...
