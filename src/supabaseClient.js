import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://khkvilitpdxhsfqpjlak.supabase.co'; // 👉 Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtoa3ZpbGl0cGR4aHNmcXBqbGFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NDk5NzgsImV4cCI6MjA1OTIyNTk3OH0.QED73qzYoo8BqZ0uxTi8g_UKA6pKiKIjdIZcuDRvChY';                       // 👉 프로젝트 anon 키

export const supabase = createClient(supabaseUrl, supabaseKey);
