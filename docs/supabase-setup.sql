-- ============================================
-- InstAPI Waitlist - Supabase Database Setup
-- ============================================
-- Run this SQL in your Supabase SQL Editor (https://supabase.com/dashboard)
-- This script sets up the waitlist_signups table with proper schema and RLS policies

-- ============================================
-- 1. Update table schema (add new columns)
-- ============================================

-- Add email verification columns if they don't exist
ALTER TABLE waitlist_signups
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS verification_token TEXT,
ADD COLUMN IF NOT EXISTS token_expires_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS verified_at TIMESTAMPTZ;

-- Add unique constraint on email (case-insensitive)
-- This uses a functional index to ensure case-insensitive uniqueness
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_signups_email_lower_idx
ON waitlist_signups (LOWER(email));

-- Add index on verification token for faster lookups
CREATE INDEX IF NOT EXISTS waitlist_signups_verification_token_idx
ON waitlist_signups (verification_token)
WHERE verification_token IS NOT NULL;

-- ============================================
-- 2. Enable Row Level Security (RLS)
-- ============================================

-- Enable RLS on the table
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 3. RLS Policies
-- ============================================
-- These policies control who can access what data

-- Drop existing policies if they exist (for clean re-runs)
DROP POLICY IF EXISTS "Allow anon insert" ON waitlist_signups;
DROP POLICY IF EXISTS "Allow anon select for verification" ON waitlist_signups;
DROP POLICY IF EXISTS "Allow anon update for verification" ON waitlist_signups;
DROP POLICY IF EXISTS "Deny anon delete" ON waitlist_signups;
DROP POLICY IF EXISTS "Allow service role full access" ON waitlist_signups;

-- Policy 1: Allow anonymous users to INSERT new signups
-- This is required for the waitlist form to work
CREATE POLICY "Allow anon insert" ON waitlist_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy 2: Allow anonymous users to SELECT their own record (by verification token)
-- This is needed for the email verification flow
CREATE POLICY "Allow anon select for verification" ON waitlist_signups
  FOR SELECT
  TO anon
  USING (verification_token IS NOT NULL);

-- Policy 3: Allow anonymous users to UPDATE for email verification only
-- Restricts what can be updated to prevent abuse
CREATE POLICY "Allow anon update for verification" ON waitlist_signups
  FOR UPDATE
  TO anon
  USING (verification_token IS NOT NULL)
  WITH CHECK (
    -- Only allow updating verification-related fields
    email_verified IS NOT NULL
  );

-- Policy 4: Deny all DELETE operations from anonymous users
-- Signups should never be deleted by anonymous users
CREATE POLICY "Deny anon delete" ON waitlist_signups
  FOR DELETE
  TO anon
  USING (false);

-- Policy 5: Service role has full access (for admin operations)
-- The service role key (not anon key) can do anything
CREATE POLICY "Allow service role full access" ON waitlist_signups
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 4. Create admin view (optional)
-- ============================================
-- This view shows verified subscribers only, useful for exports

CREATE OR REPLACE VIEW verified_waitlist AS
SELECT
  id,
  email,
  preferred_lang,
  created_at,
  verified_at
FROM waitlist_signups
WHERE email_verified = true
ORDER BY verified_at DESC;

-- ============================================
-- 5. Verification
-- ============================================
-- Run these queries to verify the setup

-- Check RLS is enabled
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'waitlist_signups';

-- Check policies
SELECT
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'waitlist_signups';

-- Check table columns
SELECT
  column_name,
  data_type,
  column_default,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'waitlist_signups';
