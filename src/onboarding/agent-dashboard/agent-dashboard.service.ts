import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgentOnboarding } from '../../database/entities/agent-onboarding.entity';

@Injectable()
export class AgentDashboardService {
  constructor(
    @InjectRepository(AgentOnboarding)
    private readonly repo: Repository<AgentOnboarding>,
  ) {}

  async findByDate(organizationId: string, date: string) {
    const rows = await this.repo.find({
      where: { organizationId, date },
      order: { sortOrder: 'ASC', timeOfEvent: 'ASC' } as any,
    });

    return {
      date,
      alerts:       rows.filter(r => r.entryType === 'alert'),
      priorities:   rows.filter(r => r.entryType === 'priority'),
      timeline:     rows.filter(r => r.entryType === 'timeline'),
      activities:   rows.filter(r => r.entryType === 'activity'),
      kpis:         rows.filter(r => r.entryType === 'kpi'),
      plannedTasks: rows.filter(r => r.entryType === 'planned_task'),
      docsPending:  rows.filter(r => r.entryType === 'doc_pending'),
    };
  }
}
