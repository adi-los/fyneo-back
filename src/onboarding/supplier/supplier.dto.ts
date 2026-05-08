import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class QuerySupplierDto {
  @IsOptional() @Type(() => Number) page?: number = 0;
  @IsOptional() @Type(() => Number) limit?: number = 10;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() country?: string;
  @IsOptional() @IsString() category?: string;
}

export class SupplierBodyDto {
  @IsOptional() @IsString() supplierCode?: string;
  @IsOptional() @IsString() type?: string;
  @IsOptional() @IsString() companyName?: string;
  @IsOptional() @IsString() ice?: string;
  @IsOptional() @IsString() rc?: string;
  @IsOptional() @IsString() taxId?: string;
  @IsOptional() @IsString() firstName?: string;
  @IsOptional() @IsString() lastName?: string;
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() mobile?: string;
  @IsOptional() @IsString() website?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() country?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsString() paymentTerms?: string;
  @IsOptional() @IsString() bankName?: string;
  @IsOptional() @IsString() bankAccount?: string;
  @IsOptional() @IsString() iban?: string;
  @IsOptional() @IsString() swift?: string;
  @IsOptional() @IsString() currency?: string;
  @IsOptional() @IsString() status?: string;
}
