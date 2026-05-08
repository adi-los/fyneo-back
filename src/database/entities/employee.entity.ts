import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';

@Entity({ schema: 'public', name: 'employee' })
@Index('idx_employee_org', ['organizationId'])
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organization_id' })
  organizationId: string;

  @Column({ name: 'employee_code', length: 50, unique: true, nullable: true })
  employeeCode: string;

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

  @Column({ name: 'job_title', length: 100, nullable: true })
  jobTitle: string;

  @Column({ length: 100, nullable: true })
  department: string;

  @Column({ name: 'manager_id', type: 'uuid', nullable: true })
  managerId: string;

  @ManyToOne(() => Employee, { nullable: true })
  @JoinColumn({ name: 'manager_id' })
  manager: Employee;

  @Column({ name: 'contract_type', type: 'enum', enum: ['CDI', 'CDD', 'Stage'], nullable: true })
  contractType: string;

  @Column({ name: 'hire_date', type: 'date', nullable: true })
  hireDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  salary: number;

  @Column({ length: 10, nullable: true })
  currency: string;

  @Column({ name: 'cnss_number', length: 100, nullable: true })
  cnssNumber: string;

  @Column({ name: 'birth_date', type: 'date', nullable: true })
  birthDate: Date;

  @Column({ name: 'national_id', length: 100, nullable: true })
  nationalId: string;

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
