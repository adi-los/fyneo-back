CREATE TABLE public.agent_onboarding (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID        NOT NULL,
  date            DATE        NOT NULL,
  entry_type      VARCHAR(50) NOT NULL,
  time_of_event   VARCHAR(10),
  title           VARCHAR(500),
  description     TEXT,
  alert_type      VARCHAR(20),
  message         TEXT,
  urgency         VARCHAR(20),
  action_type     VARCHAR(50),
  deadline        DATE,
  action          VARCHAR(50),
  entity_type     VARCHAR(50),
  dossier_name    VARCHAR(255),
  kpi_key         VARCHAR(100),
  kpi_value       INTEGER,
  kpi_sub         VARCHAR(255),
  day_label       VARCHAR(50),
  task_color      VARCHAR(20),
  sort_order      INTEGER     DEFAULT 0,
  created_by      UUID,
  created_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_agent_onb_org_date
  ON public.agent_onboarding (organization_id, date);
