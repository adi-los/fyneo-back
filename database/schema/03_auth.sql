CREATE TABLE public."user" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  is_active BOOLEAN DEFAULT TRUE,
  email_verified BOOLEAN DEFAULT FALSE,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_org
    FOREIGN KEY (organization_id)
    REFERENCES public.organization(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_user_org ON public."user"(organization_id);

CREATE TABLE public.refresh_token (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  token TEXT NOT NULL,
  is_revoked BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_token_user
    FOREIGN KEY (user_id)
    REFERENCES public."user"(id)
    ON DELETE CASCADE
);

CREATE TABLE public.email_verification (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  token TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_email_user
    FOREIGN KEY (user_id)
    REFERENCES public."user"(id)
    ON DELETE CASCADE
);

CREATE TABLE public.password_reset (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  token TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reset_user
    FOREIGN KEY (user_id)
    REFERENCES public."user"(id)
    ON DELETE CASCADE
);

CREATE TABLE public.user_permission (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  module VARCHAR(100),
  can_create BOOLEAN,
  can_read BOOLEAN,
  can_update BOOLEAN,
  can_delete BOOLEAN,
  CONSTRAINT fk_perm_user
    FOREIGN KEY (user_id)
    REFERENCES public."user"(id)
    ON DELETE CASCADE
);
