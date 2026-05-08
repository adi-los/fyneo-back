import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity({ schema: 'public', name: 'agent_onboarding' })
@Index('idx_agent_onb_org_date', ['organizationId', 'date'])
export class AgentOnboarding {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organization_id' })
  organizationId: string;

  @Column({ type: 'date' })
  date: string;

  // Discriminator: alert | priority | timeline | activity | kpi | planned_task | doc_pending
  @Column({ name: 'entry_type', length: 50 })
  entryType: string;

  // Shared
  @Column({ name: 'time_of_event', length: 10, nullable: true })
  timeOfEvent: string;

  @Column({ length: 500, nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  // alert + timeline: error | warning | success | info | action
  @Column({ name: 'alert_type', length: 20, nullable: true })
  alertType: string;

  // alert
  @Column({ type: 'text', nullable: true })
  message: string;

  // priority
  @Column({ length: 20, nullable: true })
  urgency: string; // haute | moyenne | basse

  @Column({ name: 'action_type', length: 50, nullable: true })
  actionType: string; // validation | relance | signature | verification

  @Column({ type: 'date', nullable: true })
  deadline: string;

  // activity
  @Column({ length: 50, nullable: true })
  action: string; // added | modified | completed | rejected

  @Column({ name: 'entity_type', length: 50, nullable: true })
  entityType: string; // CLIENT | FOURNISSEUR | CONTACT | SALARIE

  // Shared reference name
  @Column({ name: 'dossier_name', length: 255, nullable: true })
  dossierName: string;

  // kpi: kpiKey identifies which KPI, kpiValue = numeric, kpiSub = subtitle / text value
  @Column({ name: 'kpi_key', length: 100, nullable: true })
  kpiKey: string;

  @Column({ name: 'kpi_value', type: 'integer', nullable: true })
  kpiValue: number;

  @Column({ name: 'kpi_sub', length: 255, nullable: true })
  kpiSub: string;

  // planned_task
  @Column({ name: 'day_label', length: 50, nullable: true })
  dayLabel: string;

  @Column({ name: 'task_color', length: 20, nullable: true })
  taskColor: string;

  @Column({ name: 'sort_order', type: 'integer', default: 0 })
  sortOrder: number;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
