import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryEmployeeDto {
  @IsOptional() @Type(() => Number) page?: number = 0;
  @IsOptional() @Type(() => Number) limit?: number = 10;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() department?: string;
  @IsOptional() @IsString() contractType?: string;
}

export class EmployeeBodyDto {
  @IsOptional() @IsString() employeeCode?: string;
  @IsOptional() @IsString() firstName?: string;
  @IsOptional() @IsString() lastName?: string;
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() mobile?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() country?: string;
  @IsOptional() @IsString() jobTitle?: string;
  @IsOptional() @IsString() department?: string;
  @IsOptional() @IsString() managerId?: string;
  @IsOptional() @IsString() contractType?: string;
  @IsOptional() @IsString() hireDate?: string;
  @IsOptional() @IsString() endDate?: string;
  @IsOptional() @IsNumber() @Type(() => Number) salary?: number;
  @IsOptional() @IsString() currency?: string;
  @IsOptional() @IsString() cnssNumber?: string;
  @IsOptional() @IsString() birthDate?: string;
  @IsOptional() @IsString() nationalId?: string;
  @IsOptional() @IsString() status?: string;
}
