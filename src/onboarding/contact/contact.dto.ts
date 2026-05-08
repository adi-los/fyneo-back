import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryContactDto {
  @IsOptional() @Type(() => Number) page?: number = 0;
  @IsOptional() @Type(() => Number) limit?: number = 10;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() country?: string;
  @IsOptional() @IsString() type?: string;
}

export class ContactBodyDto {
  @IsOptional() @IsString() type?: string;
  @IsOptional() @IsString() firstName?: string;
  @IsOptional() @IsString() lastName?: string;
  @IsOptional() @IsString() companyName?: string;
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() mobile?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() country?: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() tags?: string[];
  @IsOptional() @IsString() status?: string;
}
