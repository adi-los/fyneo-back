CREATE TABLE public.organization (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  legal_name VARCHAR(255),
  ice VARCHAR(50),
  rc VARCHAR(50),
  tax_id VARCHAR(50),
  cnss VARCHAR(50),
  email VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  logo_url TEXT,
  plan VARCHAR(50) DEFAULT 'free',
  status public.status_enum DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_org_name ON public.organization(name);
