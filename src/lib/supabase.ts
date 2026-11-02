import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://atwdzfchknvsvdldhkug.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0d2R6ZmNoa252c3ZkbGRoa3VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0Njc5NTAsImV4cCI6MjA5MzA0Mzk1MH0.-PSbaXb0itvoCoh3KkqOkUD7AzQgns9u2ygc-eIHiX8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
