import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity({ schema: 'public', name: 'customer' })
@Index('idx_customer_org', ['organizationId'])
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organization_id' })
  organizationId: string;

  @Column({ name: 'customer_code', length: 50, unique: true, nullable: true })
  customerCode: string;

  @Column({ type: 'enum', enum: ['company', 'individual'], nullable: true })
  type: string;

  @Column({ name: 'company_name', length: 255, nullable: true })
  companyName: string;

  @Column({ length: 50, nullable: true })
  ice: string;

  @Column({ length: 50, nullable: true })
  rc: string;

  @Column({ name: 'tax_id', length: 50, nullable: true })
  taxId: string;

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

  @Column({ length: 255, nullable: true })
  website: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 100, nullable: true })
  city: string;

  @Column({ length: 100, nullable: true })
  country: string;

  @Column({ length: 100, nullable: true })
  sector: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ name: 'payment_terms', length: 50, nullable: true })
  paymentTerms: string;

  @Column({ name: 'credit_limit', type: 'numeric', precision: 12, scale: 2, nullable: true })
  creditLimit: number;

  @Column({ length: 10, nullable: true })
  currency: string;

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
