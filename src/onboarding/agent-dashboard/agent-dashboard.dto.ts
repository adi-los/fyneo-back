import { IsOptional, IsString } from 'class-validator';

export class QueryAgentDashboardDto {
  @IsOptional()
  @IsString()
  date?: string; // YYYY-MM-DD — defaults to today in the controller
}
