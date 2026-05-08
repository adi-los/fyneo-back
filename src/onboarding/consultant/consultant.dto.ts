import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryConsultantDto {
  @IsOptional() @Type(() => Number) page?: number = 0;
  @IsOptional() @Type(() => Number) limit?: number = 10;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() type?: string;
  @IsOptional() @IsString() availabilityStatus?: string;
}

export class ConsultantBodyDto {
  @IsOptional() @IsString() consultantCode?: string;
  @IsOptional() @IsString() type?: string;
  @IsOptional() @IsString() firstName?: string;
  @IsOptional() @IsString() lastName?: string;
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() mobile?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() country?: string;
  @IsOptional() skills?: string[];
  @IsOptional() @IsString() seniority?: string;
  @IsOptional() @IsNumber() @Type(() => Number) dailyRate?: number;
  @IsOptional() @IsString() currency?: string;
  @IsOptional() @IsString() availabilityStatus?: string;
  @IsOptional() @IsString() companyName?: string;
  @IsOptional() @IsString() supplierRefId?: string;
  @IsOptional() @IsString() status?: string;
}
