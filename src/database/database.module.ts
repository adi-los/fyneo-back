import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Organization,
  User,
  RefreshToken,
  EmailVerification,
  PasswordReset,
  UserPermission,
  Supplier,
  Contact,
  Customer,
  Employee,
  Consultant,
  AgentOnboarding,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5438', 10),
      username: process.env.DB_USER ?? 'fyneo',
      password: process.env.DB_PASS ?? 'fyneo',
      database: process.env.DB_NAME ?? 'fyneo',
      entities: [
        Organization,
        User,
        RefreshToken,
        EmailVerification,
        PasswordReset,
        UserPermission,
        Supplier,
        Contact,
        Customer,
        Employee,
        Consultant,
        AgentOnboarding,
      ],
      synchronize: false,
      logging: process.env.NODE_ENV !== 'production',
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
