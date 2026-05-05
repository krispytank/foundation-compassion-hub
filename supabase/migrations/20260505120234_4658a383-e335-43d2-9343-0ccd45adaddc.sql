
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  id_number TEXT NOT NULL,
  county TEXT NOT NULL DEFAULT 'Elgeyo-Marakwet',
  constituency TEXT NOT NULL,
  ward TEXT NOT NULL,
  village TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- No public SELECT policy: submissions are private by default.
-- Inserts happen via the service-role client in a server function, which bypasses RLS.
-- (No INSERT policy needed for anon clients.)
