import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey)
  throw new Error(
    "Supabase key or url is missing. Please check your environment variables."
  );
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
