import { createClient } from "@supabase/supabase-js";

function requiredEnvironmentValue(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(
      `Missing ${name}. Copy .env.example to .env and provide the public Supabase project value.`,
    );
  }

  return value;
}

const supabaseUrl = requiredEnvironmentValue("VITE_SUPABASE_URL");
const supabaseAnonKey = requiredEnvironmentValue("VITE_SUPABASE_ANON_KEY");

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: true,
    persistSession: true,
  },
});
