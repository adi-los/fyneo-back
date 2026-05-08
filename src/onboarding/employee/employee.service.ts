import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../../database/entities/employee.entity';
import { QueryEmployeeDto, EmployeeBodyDto } from './employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly repo: Repository<Employee>,
  ) {}

  async findAll(organizationId: string, query: QueryEmployeeDto) {
    const { page = 0, limit = 10, search, status, department, contractType } = query;

    const qb = this.repo.createQueryBuilder('e')
      .where('e.organization_id = :organizationId', { organizationId });

    if (status)       qb.andWhere('e.status = :status', { status });
    if (department)   qb.andWhere('e.department = :department', { department });
    if (contractType) qb.andWhere('e.contract_type = :contractType', { contractType });
    if (search) {
      const q = `%${search}%`;
      qb.andWhere(
        '(e.first_name ILIKE :q OR e.last_name ILIKE :q OR e.email ILIKE :q OR e.job_title ILIKE :q OR e.department ILIKE :q)',
        { q },
      );
    }

    const [data, total] = await qb
      .orderBy('e.created_at', 'DESC')
      .skip(page * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string, organizationId: string) {
    const item = await this.repo.findOne({ where: { id, organizationId } });
    if (!item) throw new NotFoundException('Employee not found');
    return item;
  }

  async create(organizationId: string, dto: EmployeeBodyDto, userId: string) {
    const item = this.repo.create({ ...dto, organizationId, createdBy: userId });
    return this.repo.save(item);
  }

  async update(id: string, organizationId: string, dto: EmployeeBodyDto, userId: string) {
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
