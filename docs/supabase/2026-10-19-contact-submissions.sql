-- Uitgevoerd op 19 oktober 2026 (migratie contact_submissions_uitgebreid_formulier)
-- in Supabase-project fjqkdwnhrolkwiobrzcl. Hier ter naslag; de dienstenlijst
-- moet gelijk blijven aan `diensten` in lib/content.ts.

alter table public.contact_submissions
  add column if not exists company text,
  add column if not exists phone text,
  add column if not exists services text[],
  add column if not exists website text,
  add column if not exists pakket text,
  add column if not exists page_path text;

alter table public.contact_submissions alter column message drop not null;

drop policy if exists "Anyone can submit the contact form" on public.contact_submissions;

create policy "Anyone can submit the contact form"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (
    char_length(email) between 3 and 320
    and position('@' in email) > 1
    and (
      -- Oud formulier (live tot de volgende deploy): geen diensten, bericht verplicht.
      -- TODO: dit blok weghalen zodra het nieuwe formulier op disseldesign.com staat.
      (
        services is null
        and char_length(coalesce(name, '')) <= 200
        and char_length(coalesce(message, '')) between 1 and 5000
        and char_length(coalesce(project_type, '')) <= 100
        and company is null and phone is null and website is null
      )
      or
      -- Nieuw formulier: naam en minstens één dienst uit de vaste lijst.
      (
        services is not null
        and cardinality(services) between 1 and 7
        and services <@ array[
          'Nieuwe website',
          'Bestaande website verbeteren',
          'Webshop',
          'Branding & huisstijl',
          'UX/UI design',
          'Webdevelopment',
          'Anders / weet ik nog niet'
        ]::text[]
        and char_length(btrim(coalesce(name, ''))) between 1 and 100
        and char_length(coalesce(company, '')) <= 100
        and char_length(coalesce(phone, '')) <= 30
        and char_length(coalesce(website, '')) <= 200
        and char_length(coalesce(message, '')) <= 2000
        and char_length(coalesce(pakket, '')) <= 40
        and char_length(coalesce(page_path, '')) <= 200
        and project_type is null
      )
    )
  );

-- 19 oktober 2026, later (migratie contact_submissions_alleen_nieuw_formulier):
-- het nieuwe formulier staat live, dus het blok "oud formulier" is weg. De
-- policy is nu alleen het tweede blok hierboven (naam + minstens één dienst
-- uit de vaste lijst, lengtes, project_type leeg), plus de e-mailcheck.
