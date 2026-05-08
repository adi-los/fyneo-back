CREATE TABLE public.consultant (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  consultant_code VARCHAR(50) UNIQUE,
  type public.consultant_type_enum NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(50),
  mobile VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  skills JSONB,
  seniority VARCHAR(50),
  daily_rate NUMERIC(12,2),
  currency VARCHAR(10),
  availability_status public.availability_enum DEFAULT 'available',
  company_name VARCHAR(255),
  supplier_ref_id UUID,
  status public.status_enum DEFAULT 'active',
  created_by UUID,
  updated_by UUID,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_consultant_supplier
    FOREIGN KEY (supplier_ref_id) REFERENCES public.supplier(id)
);

CREATE INDEX idx_consultant_org ON public.consultant(organization_id);
