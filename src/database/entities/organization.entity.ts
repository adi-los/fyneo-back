import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity({ schema: 'public', name: 'organization' })
@Index('idx_org_name', ['name'])
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'legal_name', length: 255, nullable: true })
  legalName: string;

  @Column({ length: 50, nullable: true })
  ice: string;

  @Column({ length: 50, nullable: true })
  rc: string;

  @Column({ name: 'tax_id', length: 50, nullable: true })
  taxId: string;

  @Column({ length: 50, nullable: true })
  cnss: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ length: 50, nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 100, nullable: true })
  city: string;

  @Column({ length: 100, nullable: true })
  country: string;

  @Column({ name: 'logo_url', type: 'text', nullable: true })
  logoUrl: string;

  @Column({ length: 50, default: 'free' })
  plan: string;

  @Column({ type: 'enum', enum: ['active', 'inactive', 'archived', 'blocked'], default: 'active' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
