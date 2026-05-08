import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../database/entities/customer.entity';
import { Supplier } from '../database/entities/supplier.entity';
import { Contact } from '../database/entities/contact.entity';
import { Employee } from '../database/entities/employee.entity';
import { Consultant } from '../database/entities/consultant.entity';
import { AgentOnboarding } from '../database/entities/agent-onboarding.entity';
import { AuthModule } from '../auth/auth.module';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { SupplierController } from './supplier/supplier.controller';
import { SupplierService } from './supplier/supplier.service';
import { ContactController } from './contact/contact.controller';
import { ContactService } from './contact/contact.service';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeService } from './employee/employee.service';
import { ConsultantController } from './consultant/consultant.controller';
import { ConsultantService } from './consultant/consultant.service';
import { AgentDashboardController } from './agent-dashboard/agent-dashboard.controller';
import { AgentDashboardService } from './agent-dashboard/agent-dashboard.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, Supplier, Contact, Employee, Consultant, AgentOnboarding]),
    AuthModule,
  ],
  controllers: [
    CustomerController,
    SupplierController,
    ContactController,
    EmployeeController,
    ConsultantController,
    AgentDashboardController,
  ],
  providers: [
    CustomerService,
    SupplierService,
    ContactService,
    EmployeeService,
    ConsultantService,
    AgentDashboardService,
  ],
})
export class OnboardingModule {}
