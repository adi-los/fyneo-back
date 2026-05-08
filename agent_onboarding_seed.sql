-- ============================================================
-- agent_onboarding table + seed data
-- Replace 'YOUR_ORG_ID' with your real organization UUID
-- ============================================================

CREATE TABLE IF NOT EXISTS agent_onboarding (
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
  created_at      TIMESTAMP   DEFAULT NOW(),
  updated_at      TIMESTAMP   DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_agent_onb_org_date
  ON agent_onboarding (organization_id, date);

-- ============================================================
-- SEED — replace 'YOUR_ORG_ID' before running
-- ============================================================

DO $$
DECLARE org UUID := 'YOUR_ORG_ID'::UUID;
BEGIN

-- ┌─────────────────────────────────────────────────────────────┐
-- │  DATE: 2026-05-07  (today)                                  │
-- └─────────────────────────────────────────────────────────────┘

-- KPIs (Vue Agent bar)
INSERT INTO agent_onboarding (organization_id, date, entry_type, kpi_key, kpi_value, kpi_sub, sort_order) VALUES
  (org, '2026-05-07', 'kpi', 'total_dossiers',   12, '+1 aujourd''hui',      1),
  (org, '2026-05-07', 'kpi', 'completed',          5, '41% du total',         2),
  (org, '2026-05-07', 'kpi', 'en_cours',           4, '2 prioritaires',       3),
  (org, '2026-05-07', 'kpi', 'docs_en_attente',    3, 'Validation requise',   4),
  (org, '2026-05-07', 'kpi', 'contrats_actifs',    6, '/9 total',             5),
  (org, '2026-05-07', 'kpi', 'taux_completion',   68, 'Moyenne dossiers',     6),
-- KPIs (Alertes top bar)
  (org, '2026-05-07', 'kpi', 'dossiers_actifs',    4, NULL,                   7),
  (org, '2026-05-07', 'kpi', 'traites_aujourd_hui',2, NULL,                   8),
  (org, '2026-05-07', 'kpi', 'prets_activation',   1, NULL,                   9),
-- Répartition
  (org, '2026-05-07', 'kpi', 'repartition_CLIENT',      4, NULL,             10),
  (org, '2026-05-07', 'kpi', 'repartition_FOURNISSEUR', 3, NULL,             11),
  (org, '2026-05-07', 'kpi', 'repartition_CONTACT',     3, NULL,             12),
  (org, '2026-05-07', 'kpi', 'repartition_SALARIE',     6, NULL,             13),
-- Agent health
  (org, '2026-05-07', 'kpi', 'agent_status',        NULL, 'Opérationnel',    14),
  (org, '2026-05-07', 'kpi', 'agent_precision',     NULL, '98.4%',           15),
  (org, '2026-05-07', 'kpi', 'agent_docs_analyses', NULL, '24 / jour',       16),
  (org, '2026-05-07', 'kpi', 'agent_response_time', NULL, '1.2 s',           17);

-- Alerts
INSERT INTO agent_onboarding (organization_id, date, entry_type, alert_type, title, message, time_of_event, dossier_name, sort_order) VALUES
  (org, '2026-05-07', 'alert', 'error',   'Document rejeté automatiquement',
    'L''attestation fiscale de Logistix Maroc ne correspond pas au format attendu (PDF corrompu).',
    '09:14', 'Logistix Maroc', 1),
  (org, '2026-05-07', 'alert', 'error',   'Échec envoi email relance',
    'L''email de relance à Tech Supplies SAS a bounced — adresse invalide.',
    '08:52', 'Tech Supplies SAS', 2),
  (org, '2026-05-07', 'alert', 'warning', 'Contrat expirant sous 30 jours',
    'CTR-2024-009 (Nexify Digital) expire le 09/11/2026. Renouvellement à planifier.',
    '08:30', 'Nexify Digital', 3),
  (org, '2026-05-07', 'alert', 'warning', 'Progression stagnante',
    'Pharma Plus est à 40% depuis 10 jours sans progression. Intervention recommandée.',
    '08:15', 'Pharma Plus', 4),
  (org, '2026-05-07', 'alert', 'success', 'Dossier complété',
    'Nexify Digital — onboarding 100% validé. Contrat annuel actif.',
    '07:48', 'Nexify Digital', 5),
  (org, '2026-05-07', 'alert', 'success', 'Accord de partenariat signé',
    'Jean Dupont a signé l''accord de confidentialité CTR-2025-002.',
    '07:30', 'Jean Dupont', 6),
  (org, '2026-05-07', 'alert', 'info',    'Nouveau contact ajouté',
    'Karim Alaoui (Contact — Conseil) a été ajouté et son onboarding est en cours à 70%.',
    '07:12', 'Karim Alaoui', 7),
  (org, '2026-05-07', 'alert', 'info',    'Analyse dossier terminée',
    'Analyse KYC de Global Services complétée. 1 document en attente de validation humaine.',
    '06:55', 'Global Services', 8);

-- Priorities
INSERT INTO agent_onboarding (organization_id, date, entry_type, urgency, action_type, title, description, dossier_name, deadline, sort_order) VALUES
  (org, '2026-05-07', 'priority', 'haute',  'signature',    'Signature contrat Acme Corp',
    'CTR-2025-001 en attente de signature depuis 3 jours. Deadline approche.',
    'Acme Corp', '2026-05-10', 1),
  (org, '2026-05-07', 'priority', 'haute',  'validation',   'Valider relevé bancaire',
    'Acme Corp a soumis un relevé bancaire — validation humaine requise avant traitement.',
    'Acme Corp', '2026-05-08', 2),
  (org, '2026-05-07', 'priority', 'moyenne','relance',      'Relancer Tech Supplies SAS',
    'IBAN fournisseur manquant depuis 5 jours. Aucune réponse à l''email automatique.',
    'Tech Supplies SAS', '2026-05-12', 3),
  (org, '2026-05-07', 'priority', 'moyenne','verification', 'Vérifier statut Pharma Plus',
    'Autorisation DG non soumise. Direction juridique à contacter directement.',
    'Pharma Plus', '2026-05-14', 4),
  (org, '2026-05-07', 'priority', 'basse',  'relance',      'Rouvrir dossier Marie Curie',
    'Justificatif de domicile expiré. Demander un nouveau document au contact.',
    'Marie Curie', '2026-05-20', 5);

-- Timeline
INSERT INTO agent_onboarding (organization_id, date, entry_type, alert_type, title, description, time_of_event, sort_order) VALUES
  (org, '2026-05-07', 'timeline', 'error',   'Rejet doc Logistix',   'Attestation fiscale corrompue — rejetée automatiquement.',                      '09:14', 1),
  (org, '2026-05-07', 'timeline', 'warning', 'Email bounce détecté', 'Relance Tech Supplies SAS en échec — adresse email invalide.',                  '08:52', 2),
  (org, '2026-05-07', 'timeline', 'action',  'Analyse contrats',     '6 contrats analysés — 1 expiration détectée dans 30 jours.',                    '08:30', 3),
  (org, '2026-05-07', 'timeline', 'warning', 'Alerte progression',   'Pharma Plus stagnant à 40% depuis 10 jours.',                                   '08:15', 4),
  (org, '2026-05-07', 'timeline', 'success', 'Dossier validé',       'Nexify Digital — onboarding complété à 100%.',                                  '07:48', 5),
  (org, '2026-05-07', 'timeline', 'success', 'Contrat signé',        'Accord de partenariat Jean Dupont confirmé.',                                   '07:30', 6),
  (org, '2026-05-07', 'timeline', 'action',  'Nouveau contact',      'Karim Alaoui créé et indexé dans la base.',                                     '07:12', 7),
  (org, '2026-05-07', 'timeline', 'action',  'Analyse KYC',          'Global Services — analyse KYC terminée en 2 min 14 s.',                         '06:55', 8),
  (org, '2026-05-07', 'timeline', 'action',  'Synchronisation',      '10 dossiers synchronisés avec le CRM central.',                                 '06:30', 9);

-- Activities
INSERT INTO agent_onboarding (organization_id, date, entry_type, action, entity_type, dossier_name, time_of_event, sort_order) VALUES
  (org, '2026-05-07', 'activity', 'added',     'CONTACT',     'Karim Alaoui',   '07:12', 1),
  (org, '2026-05-07', 'activity', 'completed', 'CLIENT',      'Nexify Digital', '07:48', 2),
  (org, '2026-05-07', 'activity', 'modified',  'CLIENT',      'Global Services','06:55', 3),
  (org, '2026-05-07', 'activity', 'rejected',  'FOURNISSEUR', 'Logistix Maroc', '09:14', 4),
  (org, '2026-05-07', 'activity', 'modified',  'CLIENT',      'Acme Corp',      '08:10', 5),
  (org, '2026-05-07', 'activity', 'added',     'SALARIE',     'Emma Petit',     '09:00', 6);

-- Docs pending
INSERT INTO agent_onboarding (organization_id, date, entry_type, alert_type, title, description, dossier_name, sort_order) VALUES
  (org, '2026-05-07', 'doc_pending', 'en_attente', 'Relevé bancaire 3 mois',     'Financier', 'Acme Corp',        1),
  (org, '2026-05-07', 'doc_pending', 'manquant',   'Déclaration fiscale N-1',    'Financier', 'Acme Corp',        2),
  (org, '2026-05-07', 'doc_pending', 'en_attente', 'IBAN fournisseur',           'Financier', 'Tech Supplies SAS',3),
  (org, '2026-05-07', 'doc_pending', 'en_attente', 'Garanties bancaires',        'Financier', 'Global Services',  4),
  (org, '2026-05-07', 'doc_pending', 'en_attente', 'Autorisation DG',            'Juridique', 'Pharma Plus',      5),
  (org, '2026-05-07', 'doc_pending', 'manquant',   'Justificatif de domicile',   'KYC',       'Marie Curie',      6);

-- Planned tasks
INSERT INTO agent_onboarding (organization_id, date, entry_type, title, day_label, task_color, sort_order) VALUES
  (org, '2026-05-07', 'planned_task', 'Relance Tech Supplies',      'Demain', '#f59e0b', 1),
  (org, '2026-05-07', 'planned_task', 'Signature Acme Corp',        'J+2',   '#ef4444', 2),
  (org, '2026-05-07', 'planned_task', 'Renouvellement CTR-2024-009','J+5',   '#8b5cf6', 3),
  (org, '2026-05-07', 'planned_task', 'Audit dossiers Q1',          'J+7',   '#0d9394', 4);


-- ┌─────────────────────────────────────────────────────────────┐
-- │  DATE: 2026-05-06  (yesterday)                              │
-- └─────────────────────────────────────────────────────────────┘

-- KPIs
INSERT INTO agent_onboarding (organization_id, date, entry_type, kpi_key, kpi_value, kpi_sub, sort_order) VALUES
  (org, '2026-05-06', 'kpi', 'total_dossiers',   11, 'Stable',               1),
  (org, '2026-05-06', 'kpi', 'completed',          4, '36% du total',         2),
  (org, '2026-05-06', 'kpi', 'en_cours',           5, '3 prioritaires',       3),
  (org, '2026-05-06', 'kpi', 'docs_en_attente',    5, 'Validation requise',   4),
  (org, '2026-05-06', 'kpi', 'contrats_actifs',    5, '/8 total',             5),
  (org, '2026-05-06', 'kpi', 'taux_completion',   55, 'Moyenne dossiers',     6),
  (org, '2026-05-06', 'kpi', 'dossiers_actifs',    5, NULL,                   7),
  (org, '2026-05-06', 'kpi', 'traites_aujourd_hui',3, NULL,                   8),
  (org, '2026-05-06', 'kpi', 'prets_activation',   2, NULL,                   9),
  (org, '2026-05-06', 'kpi', 'repartition_CLIENT',      4, NULL,             10),
  (org, '2026-05-06', 'kpi', 'repartition_FOURNISSEUR', 2, NULL,             11),
  (org, '2026-05-06', 'kpi', 'repartition_CONTACT',     3, NULL,             12),
  (org, '2026-05-06', 'kpi', 'repartition_SALARIE',     5, NULL,             13),
  (org, '2026-05-06', 'kpi', 'agent_status',        NULL, 'Opérationnel',    14),
  (org, '2026-05-06', 'kpi', 'agent_precision',     NULL, '97.1%',           15),
  (org, '2026-05-06', 'kpi', 'agent_docs_analyses', NULL, '19 / jour',       16),
  (org, '2026-05-06', 'kpi', 'agent_response_time', NULL, '1.5 s',           17);

-- Alerts
INSERT INTO agent_onboarding (organization_id, date, entry_type, alert_type, title, message, time_of_event, dossier_name, sort_order) VALUES
  (org, '2026-05-06', 'alert', 'error',   'Contrat expiré non renouvelé',
    'CTR-2023-015 de Immo Pro SAS est expiré depuis 7 jours. Aucune action enregistrée.',
    '10:05', 'Immo Pro SAS', 1),
  (org, '2026-05-06', 'alert', 'warning', 'Délai KYC dépassé',
    'Global Services — vérification KYC en attente depuis 15 jours. Risque compliance.',
    '09:30', 'Global Services', 2),
  (org, '2026-05-06', 'alert', 'warning', 'Document doublon détecté',
    'Deux versions du Kbis ont été soumises pour Pharma Plus. Vérification manuelle requise.',
    '09:00', 'Pharma Plus', 3),
  (org, '2026-05-06', 'alert', 'success', 'Nouveau fournisseur validé',
    'Immo Pro SAS — dossier fournisseur complété et activé avec succès.',
    '08:20', 'Immo Pro SAS', 4),
  (org, '2026-05-06', 'alert', 'success', 'Contrat renouvelé automatiquement',
    'CTR-2025-003 (Global Services) renouvelé pour 12 mois supplémentaires.',
    '07:55', 'Global Services', 5),
  (org, '2026-05-06', 'alert', 'info',    'Rapport journalier généré',
    'Rapport d''activité du 2026-05-05 disponible — 8 dossiers traités, 0 rejet.',
    '06:00', NULL, 6),
  (org, '2026-05-06', 'alert', 'info',    'Mise à jour des règles KYC',
    'Nouvelles règles KYC v2.3 appliquées automatiquement à tous les dossiers actifs.',
    '05:30', NULL, 7);

-- Priorities
INSERT INTO agent_onboarding (organization_id, date, entry_type, urgency, action_type, title, description, dossier_name, deadline, sort_order) VALUES
  (org, '2026-05-06', 'priority', 'haute',  'validation',   'Valider KYC Global Services',
    'Délai réglementaire de 15 jours dépassé. Action obligatoire avant audit.',
    'Global Services', '2026-05-06', 1),
  (org, '2026-05-06', 'priority', 'haute',  'verification', 'Doublon Kbis Pharma Plus',
    'Deux documents identiques détectés — le plus récent doit être conservé.',
    'Pharma Plus', '2026-05-07', 2),
  (org, '2026-05-06', 'priority', 'moyenne','signature',    'Renouvellement contrat Logistix',
    'Contrat arrivant à échéance dans 20 jours. Négociation à lancer.',
    'Logistix Maroc', '2026-05-15', 3),
  (org, '2026-05-06', 'priority', 'moyenne','relance',      'Relancer Acme Corp — IBAN',
    'Coordonnées bancaires non mises à jour depuis le changement de banque.',
    'Acme Corp', '2026-05-13', 4),
  (org, '2026-05-06', 'priority', 'basse',  'relance',      'Compléter fiche salarié',
    'Emma Petit — CNSS non renseignée. Période d''essai en cours.',
    'Emma Petit', '2026-05-20', 5);

-- Timeline
INSERT INTO agent_onboarding (organization_id, date, entry_type, alert_type, title, description, time_of_event, sort_order) VALUES
  (org, '2026-05-06', 'timeline', 'error',   'Contrat expiré',         'CTR-2023-015 Immo Pro SAS détecté comme expiré.',                    '10:05', 1),
  (org, '2026-05-06', 'timeline', 'warning', 'Alerte compliance',      'KYC Global Services — délai 15 jours dépassé.',                     '09:30', 2),
  (org, '2026-05-06', 'timeline', 'action',  'Contrôle doublons',      'Analyse doublons terminée — 1 cas identifié (Pharma Plus).',        '09:00', 3),
  (org, '2026-05-06', 'timeline', 'success', 'Fournisseur activé',     'Immo Pro SAS — statut passé à Actif.',                              '08:20', 4),
  (org, '2026-05-06', 'timeline', 'success', 'Contrat renouvelé',      'CTR-2025-003 Global Services renouvelé automatiquement.',            '07:55', 5),
  (org, '2026-05-06', 'timeline', 'action',  'Rapport généré',         'Rapport journalier 2026-05-05 archivé.',                            '06:00', 6),
  (org, '2026-05-06', 'timeline', 'action',  'Mise à jour KYC',        'Règles KYC v2.3 déployées sur 11 dossiers actifs.',                 '05:30', 7);

-- Activities
INSERT INTO agent_onboarding (organization_id, date, entry_type, action, entity_type, dossier_name, time_of_event, sort_order) VALUES
  (org, '2026-05-06', 'activity', 'completed', 'FOURNISSEUR', 'Immo Pro SAS',    '08:20', 1),
  (org, '2026-05-06', 'activity', 'modified',  'CLIENT',      'Global Services', '09:30', 2),
  (org, '2026-05-06', 'activity', 'modified',  'CLIENT',      'Pharma Plus',     '09:00', 3),
  (org, '2026-05-06', 'activity', 'added',     'SALARIE',     'Fatima Ouali',    '08:00', 4),
  (org, '2026-05-06', 'activity', 'rejected',  'CLIENT',      'Acme Corp',       '10:15', 5);

-- Docs pending
INSERT INTO agent_onboarding (organization_id, date, entry_type, alert_type, title, description, dossier_name, sort_order) VALUES
  (org, '2026-05-06', 'doc_pending', 'manquant',   'Certificat KYC mis à jour',  'KYC',       'Global Services',  1),
  (org, '2026-05-06', 'doc_pending', 'en_attente', 'Kbis version validée',       'KYC',       'Pharma Plus',      2),
  (org, '2026-05-06', 'doc_pending', 'en_attente', 'Nouveau RIB bancaire',       'Financier', 'Acme Corp',        3),
  (org, '2026-05-06', 'doc_pending', 'manquant',   'Fiche CNSS',                 'RH',        'Emma Petit',       4),
  (org, '2026-05-06', 'doc_pending', 'en_attente', 'Avenant contrat logistique', 'Juridique', 'Logistix Maroc',   5);

-- Planned tasks
INSERT INTO agent_onboarding (organization_id, date, entry_type, title, day_label, task_color, sort_order) VALUES
  (org, '2026-05-06', 'planned_task', 'Validation KYC Global Services', 'Demain', '#ef4444', 1),
  (org, '2026-05-06', 'planned_task', 'Clarification doublon Pharma',   'J+1',   '#f59e0b', 2),
  (org, '2026-05-06', 'planned_task', 'Relance IBAN Acme Corp',         'J+3',   '#2563eb', 3),
  (org, '2026-05-06', 'planned_task', 'Renouvellement Logistix',        'J+9',   '#8b5cf6', 4);


-- ┌─────────────────────────────────────────────────────────────┐
-- │  DATE: 2026-05-05  (2 days ago)                             │
-- └─────────────────────────────────────────────────────────────┘

-- KPIs
INSERT INTO agent_onboarding (organization_id, date, entry_type, kpi_key, kpi_value, kpi_sub, sort_order) VALUES
  (org, '2026-05-05', 'kpi', 'total_dossiers',   10, 'Stable',              1),
  (org, '2026-05-05', 'kpi', 'completed',          3, '30% du total',        2),
  (org, '2026-05-05', 'kpi', 'en_cours',           6, '4 prioritaires',      3),
  (org, '2026-05-05', 'kpi', 'docs_en_attente',    7, 'Validation requise',  4),
  (org, '2026-05-05', 'kpi', 'contrats_actifs',    4, '/7 total',            5),
  (org, '2026-05-05', 'kpi', 'taux_completion',   48, 'Moyenne dossiers',    6),
  (org, '2026-05-05', 'kpi', 'dossiers_actifs',    6, NULL,                  7),
  (org, '2026-05-05', 'kpi', 'traites_aujourd_hui',1, NULL,                  8),
  (org, '2026-05-05', 'kpi', 'prets_activation',   0, NULL,                  9),
  (org, '2026-05-05', 'kpi', 'repartition_CLIENT',      3, NULL,            10),
  (org, '2026-05-05', 'kpi', 'repartition_FOURNISSEUR', 2, NULL,            11),
  (org, '2026-05-05', 'kpi', 'repartition_CONTACT',     3, NULL,            12),
  (org, '2026-05-05', 'kpi', 'repartition_SALARIE',     4, NULL,            13),
  (org, '2026-05-05', 'kpi', 'agent_status',        NULL, 'Maintenance',    14),
  (org, '2026-05-05', 'kpi', 'agent_precision',     NULL, '94.0%',          15),
  (org, '2026-05-05', 'kpi', 'agent_docs_analyses', NULL, '11 / jour',      16),
  (org, '2026-05-05', 'kpi', 'agent_response_time', NULL, '2.8 s',          17);

-- Alerts (light day — maintenance window)
INSERT INTO agent_onboarding (organization_id, date, entry_type, alert_type, title, message, time_of_event, dossier_name, sort_order) VALUES
  (org, '2026-05-05', 'alert', 'warning', 'Fenêtre de maintenance active',
    'L''agent est en mode maintenance de 02:00 à 08:00. Traitement automatique suspendu.',
    '02:00', NULL, 1),
  (org, '2026-05-05', 'alert', 'error',   'Timeout connexion base de données',
    'Connexion PostgreSQL interrompue pendant 4 min — transactions en attente réexécutées.',
    '03:15', NULL, 2),
  (org, '2026-05-05', 'alert', 'success', 'Maintenance terminée',
    'Redémarrage propre de l''agent à 08:01. Tous les services opérationnels.',
    '08:01', NULL, 3),
  (org, '2026-05-05', 'alert', 'success', 'Dossier Nexify Digital archivé',
    'Onboarding Nexify Digital archivé avec succès dans le registre des clients actifs.',
    '09:30', 'Nexify Digital', 4),
  (org, '2026-05-05', 'alert', 'info',    'Sauvegarde complète effectuée',
    'Sauvegarde quotidienne de la base de données réalisée — 2.4 GB compressés.',
    '08:05', NULL, 5),
  (org, '2026-05-05', 'alert', 'info',    'Analyse hebdomadaire lancée',
    'Analyse de conformité hebdomadaire en cours — résultats attendus sous 24h.',
    '10:00', NULL, 6);

-- Priorities
INSERT INTO agent_onboarding (organization_id, date, entry_type, urgency, action_type, title, description, dossier_name, deadline, sort_order) VALUES
  (org, '2026-05-05', 'priority', 'haute',  'verification', 'Vérifier intégrité données post-maintenance',
    'Suite à la maintenance, certains champs dossiers peuvent être incohérents.',
    NULL, '2026-05-05', 1),
  (org, '2026-05-05', 'priority', 'haute',  'validation',   'Valider transactions en attente',
    '3 transactions suspendues lors du timeout doivent être confirmées manuellement.',
    NULL, '2026-05-06', 2),
  (org, '2026-05-05', 'priority', 'moyenne','relance',      'Relancer 4 dossiers bloqués',
    'Aucune mise à jour sur 4 dossiers en cours depuis plus de 7 jours.',
    NULL, '2026-05-09', 3),
  (org, '2026-05-05', 'priority', 'basse',  'signature',    'Préparer renouvellements du mois',
    '2 contrats arrivent à terme fin mai. Documents à préparer.',
    NULL, '2026-05-25', 4);

-- Timeline (short day due to maintenance)
INSERT INTO agent_onboarding (organization_id, date, entry_type, alert_type, title, description, time_of_event, sort_order) VALUES
  (org, '2026-05-05', 'timeline', 'warning', 'Maintenance démarrée',    'Fenêtre de maintenance préventive ouverte.',                         '02:00', 1),
  (org, '2026-05-05', 'timeline', 'error',   'Timeout DB',              'Connexion PostgreSQL interrompue 4 min.',                            '03:15', 2),
  (org, '2026-05-05', 'timeline', 'action',  'Reconnexion DB',          'Reconnexion automatique réussie après 4 tentatives.',                '03:19', 3),
  (org, '2026-05-05', 'timeline', 'success', 'Maintenance terminée',    'Agent redémarré proprement — tous systèmes opérationnels.',          '08:01', 4),
  (org, '2026-05-05', 'timeline', 'action',  'Sauvegarde',              'Sauvegarde complète 2.4 GB archivée.',                               '08:05', 5),
  (org, '2026-05-05', 'timeline', 'success', 'Nexify archivé',          'Dossier Nexify Digital archivé dans le registre clients.',           '09:30', 6),
  (org, '2026-05-05', 'timeline', 'action',  'Analyse hebdomadaire',    'Lancement de l''analyse de conformité hebdomadaire.',                 '10:00', 7);

-- Activities
INSERT INTO agent_onboarding (organization_id, date, entry_type, action, entity_type, dossier_name, time_of_event, sort_order) VALUES
  (org, '2026-05-05', 'activity', 'completed', 'CLIENT',      'Nexify Digital', '09:30', 1),
  (org, '2026-05-05', 'activity', 'modified',  'FOURNISSEUR', 'Tech Supplies',  '10:15', 2),
  (org, '2026-05-05', 'activity', 'added',     'CONTACT',     'Nadia Fikri',    '11:00', 3);

-- Docs pending
INSERT INTO agent_onboarding (organization_id, date, entry_type, alert_type, title, description, dossier_name, sort_order) VALUES
  (org, '2026-05-05', 'doc_pending', 'manquant',   'Relevé de compte post-maintenance', 'Financier', NULL,               1),
  (org, '2026-05-05', 'doc_pending', 'en_attente', 'Validation transactions suspendues', 'Comptable', NULL,              2),
  (org, '2026-05-05', 'doc_pending', 'en_attente', 'Statuts société mis à jour',         'Juridique', 'Tech Supplies',   3);

-- Planned tasks
INSERT INTO agent_onboarding (organization_id, date, entry_type, title, day_label, task_color, sort_order) VALUES
  (org, '2026-05-05', 'planned_task', 'Vérification intégrité données', 'Demain', '#ef4444', 1),
  (org, '2026-05-05', 'planned_task', 'Validation transactions',        'J+1',   '#f59e0b', 2),
  (org, '2026-05-05', 'planned_task', 'Relance dossiers bloqués',       'J+4',   '#2563eb', 3),
  (org, '2026-05-05', 'planned_task', 'Renouvellements fin mai',        'J+20',  '#22c55e', 4);

END $$;
