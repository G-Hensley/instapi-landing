import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type WaitlistSignup = {
  id: string;
  email: string;
  preferred_lang: string;
  created_at: string;
  email_verified: boolean;
  verification_token: string | null;
  token_expires_at: string | null;
  verified_at: string | null;
};
