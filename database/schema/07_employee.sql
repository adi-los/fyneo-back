CREATE TABLE public.employee (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  employee_code VARCHAR(50) UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(50),
  mobile VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  job_title VARCHAR(100),
  department VARCHAR(100),
  manager_id UUID,
  contract_type public.contract_type_enum,
  hire_date DATE,
  end_date DATE,
  salary NUMERIC(12,2),
  currency VARCHAR(10),
  cnss_number VARCHAR(100),
  birth_date DATE,
  national_id VARCHAR(100),
  status public.status_enum DEFAULT 'active',
  created_by UUID,
  updated_by UUID,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_employee_manager
    FOREIGN KEY (manager_id) REFERENCES public.employee(id)
);

CREATE INDEX idx_employee_org ON public.employee(organization_id);
