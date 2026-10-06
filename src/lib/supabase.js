import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// null when .env.local isn't filled in — the app then runs on mockData.js.
export const supabase = url && key ? createClient(url, key) : null;

if (!supabase) {
  console.info("Supabase isn't configured (see .env.example), using mock data.");
}
