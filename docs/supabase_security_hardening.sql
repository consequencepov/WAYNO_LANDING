-- ================================================================
--  WAYNO — Supabase Security Hardening SQL
--  Run this AFTER the initial leads table is created (supabase_leads.sql)
--
--  PURPOSE:
--  1. Revoke direct anon INSERT (lead writes now go through Vercel serverless)
--  2. Add row-level constraints to prevent payload abuse
--  3. Add rate-limiting function at DB level (defense in depth)
--  4. Audit columns
-- ================================================================

-- ────────────────────────────────────────────
-- 1. REVOKE ANON INSERT ON LEADS
--    The Vercel serverless function uses service_role key,
--    so anon users no longer need any access to leads.
-- ────────────────────────────────────────────
REVOKE INSERT ON public.leads FROM anon;
REVOKE INSERT ON public.leads FROM authenticated;

-- Drop the old permissive insert policy (created in supabase_leads.sql)
DROP POLICY IF EXISTS "Allow public lead inserts" ON public.leads;

-- Create a new policy: only service_role can insert
-- (service_role bypasses RLS, so this policy is a safety net
--  to ensure authenticated users can't insert either)
CREATE POLICY "Deny all direct inserts"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

-- ────────────────────────────────────────────
-- 2. PAYLOAD SIZE CONSTRAINTS
--    Defense in depth: even if someone bypasses the API,
--    the DB won't accept oversized data.
-- ────────────────────────────────────────────
ALTER TABLE public.leads
  ADD CONSTRAINT leads_name_length CHECK (length(name) <= 200),
  ADD CONSTRAINT leads_phone_length CHECK (phone IS NULL OR length(phone) <= 30),
  ADD CONSTRAINT leads_email_length CHECK (email IS NULL OR length(email) <= 200),
  ADD CONSTRAINT leads_source_length CHECK (length(source) <= 100),
  ADD CONSTRAINT leads_prompt_length CHECK (prompt_text IS NULL OR length(prompt_text) <= 5000),
  ADD CONSTRAINT leads_design_length CHECK (selected_design IS NULL OR length(selected_design) <= 200),
  ADD CONSTRAINT leads_urls_count CHECK (array_length(attached_urls, 1) IS NULL OR array_length(attached_urls, 1) <= 10),
  ADD CONSTRAINT leads_files_count CHECK (array_length(attached_file_names, 1) IS NULL OR array_length(attached_file_names, 1) <= 10);

-- ────────────────────────────────────────────
-- 3. DATABASE-LEVEL RATE LIMIT FUNCTION
--    Prevents more than 10 leads per IP per hour.
--    Requires adding an `ip_address` column to leads.
-- ────────────────────────────────────────────

-- Add IP tracking column (populated by the serverless function)
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS ip_address text;

-- Create index for efficient rate-limit lookups
CREATE INDEX IF NOT EXISTS leads_ip_created_idx
  ON public.leads (ip_address, created_at DESC);

-- Rate-limit function (called by a trigger or the serverless function)
CREATE OR REPLACE FUNCTION check_lead_rate_limit()
RETURNS trigger AS $$
DECLARE
  recent_count integer;
BEGIN
  IF NEW.ip_address IS NOT NULL THEN
    SELECT count(*) INTO recent_count
    FROM public.leads
    WHERE ip_address = NEW.ip_address
      AND created_at > now() - interval '1 hour';

    IF recent_count >= 10 THEN
      RAISE EXCEPTION 'Rate limit exceeded: too many submissions from this IP.'
        USING ERRCODE = 'P0001';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger
DROP TRIGGER IF EXISTS trg_lead_rate_limit ON public.leads;
CREATE TRIGGER trg_lead_rate_limit
  BEFORE INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION check_lead_rate_limit();

-- ────────────────────────────────────────────
-- 4. DENY SELECT/UPDATE/DELETE (reinforce)
-- ────────────────────────────────────────────
-- These should already exist from supabase_leads.sql, but ensure:
DROP POLICY IF EXISTS "Deny public lead reads" ON public.leads;
CREATE POLICY "Deny public lead reads"
  ON public.leads
  FOR SELECT
  TO anon, authenticated
  USING (false);

DROP POLICY IF EXISTS "Deny public lead updates" ON public.leads;
CREATE POLICY "Deny public lead updates"
  ON public.leads
  FOR UPDATE
  TO anon, authenticated
  USING (false);

DROP POLICY IF EXISTS "Deny public lead deletes" ON public.leads;
CREATE POLICY "Deny public lead deletes"
  ON public.leads
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- ================================================================
-- VERIFICATION QUERIES (run after applying):
--
-- 1. Test anon cannot insert:
--    SET ROLE anon;
--    INSERT INTO public.leads (name, contact_method, phone, source)
--    VALUES ('test', 'phone', '+71234567890', 'test');
--    -- Expected: ERROR permission denied or policy violation
--    RESET ROLE;
--
-- 2. Test constraint:
--    INSERT INTO public.leads (name, contact_method, phone, source, prompt_text)
--    VALUES ('x', 'phone', '+71234567890', 'test', repeat('a', 6000));
--    -- Expected: ERROR violates check constraint "leads_prompt_length"
--
-- 3. Test rate limit trigger (as service_role):
--    INSERT 11 rows with same ip_address in under 1 hour
--    -- Expected: 11th row raises "Rate limit exceeded"
-- ================================================================
