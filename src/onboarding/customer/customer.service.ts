import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../../database/entities/customer.entity';
import { QueryCustomerDto, CustomerBodyDto } from './customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly repo: Repository<Customer>,
  ) {}

  async findAll(organizationId: string, query: QueryCustomerDto) {
    const { page = 0, limit = 10, search, status, country, sector } = query;

    const qb = this.repo.createQueryBuilder('c')
      .where('c.organization_id = :organizationId', { organizationId });

    if (status)  qb.andWhere('c.status = :status', { status });
    if (country) qb.andWhere('c.country = :country', { country });
    if (sector)  qb.andWhere('c.sector = :sector', { sector });
    if (search) {
      const q = `%${search}%`;
      qb.andWhere(
        '(c.company_name ILIKE :q OR c.first_name ILIKE :q OR c.last_name ILIKE :q OR c.email ILIKE :q OR c.city ILIKE :q)',
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
    if (!item) throw new NotFoundException('Customer not found');
    return item;
  }

  async create(organizationId: string, dto: CustomerBodyDto, userId: string) {
    const item = this.repo.create({ ...dto, organizationId, createdBy: userId });
    return this.repo.save(item);
  }

  async update(id: string, organizationId: string, dto: CustomerBodyDto, userId: string) {
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
