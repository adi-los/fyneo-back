import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from '../../database/entities/supplier.entity';
import { QuerySupplierDto, SupplierBodyDto } from './supplier.dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private readonly repo: Repository<Supplier>,
  ) {}

  async findAll(organizationId: string, query: QuerySupplierDto) {
    const { page = 0, limit = 10, search, status, country, category } = query;

    const qb = this.repo.createQueryBuilder('s')
      .where('s.organization_id = :organizationId', { organizationId });

    if (status)   qb.andWhere('s.status = :status', { status });
    if (country)  qb.andWhere('s.country = :country', { country });
    if (category) qb.andWhere('s.category = :category', { category });
    if (search) {
      const q = `%${search}%`;
      qb.andWhere(
        '(s.company_name ILIKE :q OR s.first_name ILIKE :q OR s.last_name ILIKE :q OR s.email ILIKE :q OR s.city ILIKE :q)',
        { q },
      );
    }

    const [data, total] = await qb
      .orderBy('s.created_at', 'DESC')
      .skip(page * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string, organizationId: string) {
    const item = await this.repo.findOne({ where: { id, organizationId } });
    if (!item) throw new NotFoundException('Supplier not found');
    return item;
  }

  async create(organizationId: string, dto: SupplierBodyDto, userId: string) {
    const item = this.repo.create({ ...dto, organizationId, createdBy: userId });
    return this.repo.save(item);
  }

  async update(id: string, organizationId: string, dto: SupplierBodyDto, userId: string) {
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
