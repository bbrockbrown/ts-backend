import dotenv from 'dotenv';

import { SupabaseClient, createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl: string = process.env.SUPABASE_URL || '';
const supabaseKey: string = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

export default supabase;
