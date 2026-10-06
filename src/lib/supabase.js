import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

let client = null;
let configError = null;

if (url && key) {
  // createClient throws on a malformed URL (e.g. missing https://). Catch it
  // so DataProvider can show the problem instead of the page going blank.
  try {
    client = createClient(url, key);
  } catch (err) {
    configError = err;
  }
} else {
  console.info("Supabase isn't configured (see .env.example), using mock data.");
}

// null when .env.local isn't filled in — the app then runs on mockData.js.
export const supabase = client;
export const supabaseConfigError = configError;
