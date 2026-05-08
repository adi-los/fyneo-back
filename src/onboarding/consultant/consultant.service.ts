import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultant } from '../../database/entities/consultant.entity';
import { QueryConsultantDto, ConsultantBodyDto } from './consultant.dto';

@Injectable()
export class ConsultantService {
  constructor(
    @InjectRepository(Consultant)
    private readonly repo: Repository<Consultant>,
  ) {}

  async findAll(organizationId: string, query: QueryConsultantDto) {
    const { page = 0, limit = 10, search, status, type, availabilityStatus } = query;

    const qb = this.repo.createQueryBuilder('c')
      .where('c.organization_id = :organizationId', { organizationId });

    if (status)             qb.andWhere('c.status = :status', { status });
    if (type)               qb.andWhere('c.type = :type', { type });
    if (availabilityStatus) qb.andWhere('c.availability_status = :availabilityStatus', { availabilityStatus });
    if (search) {
      const q = `%${search}%`;
      qb.andWhere(
        '(c.first_name ILIKE :q OR c.last_name ILIKE :q OR c.email ILIKE :q OR c.company_name ILIKE :q)',
        { q },
      );
    }

    const [data, total] = await qb
      .orderBy('c.created_at', 'DESC')
      .skip(page * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string, organizationId: string) {
    const item = await this.repo.findOne({ where: { id, organizationId } });
    if (!item) throw new NotFoundException('Consultant not found');
    return item;
  }

  async create(organizationId: string, dto: ConsultantBodyDto, userId: string) {
    const item = this.repo.create({ ...dto, organizationId, createdBy: userId });
    return this.repo.save(item);
  }

  async update(id: string, organizationId: string, dto: ConsultantBodyDto, userId: string) {
    const item = await this.findOne(id, organizationId);
    Object.assign(item, dto, { updatedBy: userId });
    return this.repo.save(item);
  }

  async remove(id: string, organizationId: string) {
    const item = await this.findOne(id, organizationId);
    await this.repo.remove(item);
    return { id };
  }
}
