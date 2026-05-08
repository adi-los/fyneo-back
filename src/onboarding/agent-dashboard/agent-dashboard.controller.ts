import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AgentDashboardService } from './agent-dashboard.service';
import { QueryAgentDashboardDto } from './agent-dashboard.dto';

@Controller('onboarding/agent-dashboard')
@UseGuards(JwtAuthGuard)
export class AgentDashboardController {
  constructor(private readonly service: AgentDashboardService) {}

  @Get()
  findByDate(@Req() req: any, @Query() q: QueryAgentDashboardDto) {
    const date = q.date ?? new Date().toISOString().split('T')[0];
    return this.service.findByDate(req.user.organizationId, date);
  }
}
