import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey)
  throw new Error(
    "Supabase key or url is missing. Please check your environment variables."
  );
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
