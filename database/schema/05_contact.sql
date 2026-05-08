CREATE TABLE public.contact (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  type public.contact_type_enum NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  mobile VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  notes TEXT,
  tags JSONB,
  status public.status_enum DEFAULT 'active',
  created_by UUID,
  updated_by UUID,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contact_org ON public.contact(organization_id);
