-- Allow anyone to submit an application (INSERT only)
CREATE POLICY "Anyone can submit an application"
ON public.applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies for anon/authenticated.
-- The service role bypasses RLS, so the foundation's server functions
-- (using supabaseAdmin) retain full access to read and manage records.