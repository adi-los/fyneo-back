import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { OnboardingModule } from './onboarding/onboarding.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, OrganizationsModule, OnboardingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
