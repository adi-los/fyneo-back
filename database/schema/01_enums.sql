CREATE TYPE public.status_enum AS ENUM ('active', 'inactive', 'archived', 'blocked');
CREATE TYPE public.contact_type_enum AS ENUM ('consultant_interne', 'consultant_externe', 'other');
CREATE TYPE public.entity_type_enum AS ENUM ('company', 'individual');
CREATE TYPE public.consultant_type_enum AS ENUM ('internal', 'external');
CREATE TYPE public.contract_type_enum AS ENUM ('CDI', 'CDD', 'Stage');
CREATE TYPE public.availability_enum AS ENUM ('available', 'busy');
