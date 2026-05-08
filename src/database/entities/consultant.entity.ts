import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Supplier } from './supplier.entity';

@Entity({ schema: 'public', name: 'consultant' })
@Index('idx_consultant_org', ['organizationId'])
export class Consultant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organization_id' })
  organizationId: string;

  @Column({ name: 'consultant_code', length: 50, unique: true, nullable: true })
  consultantCode: string;

  @Column({ type: 'enum', enum: ['internal', 'external'] })
  type: string;

  @Column({ name: 'first_name', length: 100, nullable: true })
  firstName: string;

  @Column({ name: 'last_name', length: 100, nullable: true })
  lastName: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ length: 50, nullable: true })
  phone: string;

  @Column({ length: 50, nullable: true })
  mobile: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 100, nullable: true })
  city: string;

  @Column({ length: 100, nullable: true })
  country: string;

  @Column({ type: 'jsonb', nullable: true })
  skills: object;

  @Column({ length: 50, nullable: true })
  seniority: string;

  @Column({ name: 'daily_rate', type: 'numeric', precision: 12, scale: 2, nullable: true })
  dailyRate: number;

  @Column({ length: 10, nullable: true })
  currency: string;

  @Column({ name: 'availability_status', type: 'enum', enum: ['available', 'busy'], default: 'available' })
  availabilityStatus: string;

  @Column({ name: 'company_name', length: 255, nullable: true })
  companyName: string;

  @Column({ name: 'supplier_ref_id', type: 'uuid', nullable: true })
  supplierRefId: string;

  @ManyToOne(() => Supplier, { nullable: true })
  @JoinColumn({ name: 'supplier_ref_id' })
  supplierRef: Supplier;

  @Column({ type: 'enum', enum: ['active', 'inactive', 'archived', 'blocked'], default: 'active' })
  status: string;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy: string;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
