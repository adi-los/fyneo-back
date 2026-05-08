import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ schema: 'public', name: 'user_permission' })
export class UserPermission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ length: 100, nullable: true })
  module: string;

  @Column({ name: 'can_create', type: 'boolean', nullable: true })
  canCreate: boolean;

  @Column({ name: 'can_read', type: 'boolean', nullable: true })
  canRead: boolean;

  @Column({ name: 'can_update', type: 'boolean', nullable: true })
  canUpdate: boolean;

  @Column({ name: 'can_delete', type: 'boolean', nullable: true })
  canDelete: boolean;
}
