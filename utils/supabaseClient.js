import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kmpufblmilcvortrfilp.supabase.co';  // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcHVmYmxtaWxjdm9ydHJmaWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2Mjg2MzYsImV4cCI6MjA1OTIwNDYzNn0.JYJ5WSZWp04AGxfcX2GsiPrTn2QUStCfCHmdDNyxo04';  // Replace with your Supabase anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
