import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Public client - subject to RLS policies (for client-side use)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client - bypasses RLS (for server-side API routes only)
// IMPORTANT: Never expose this client to the browser
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

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
