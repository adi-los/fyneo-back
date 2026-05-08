import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../../database/entities/contact.entity';
import { QueryContactDto, ContactBodyDto } from './contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly repo: Repository<Contact>,
  ) {}

  async findAll(organizationId: string, query: QueryContactDto) {
    const { page = 0, limit = 10, search, status, country, type } = query;

    const qb = this.repo.createQueryBuilder('c')
      .where('c.organization_id = :organizationId', { organizationId });

    if (status)  qb.andWhere('c.status = :status', { status });
    if (country) qb.andWhere('c.country = :country', { country });
    if (type)    qb.andWhere('c.type = :type', { type });
    if (search) {
      const q = `%${search}%`;
      qb.andWhere(
        '(c.first_name ILIKE :q OR c.last_name ILIKE :q OR c.company_name ILIKE :q OR c.email ILIKE :q OR c.city ILIKE :q)',
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
    if (!item) throw new NotFoundException('Contact not found');
    return item;
  }

  async create(organizationId: string, dto: ContactBodyDto, userId: string) {
    const item = this.repo.create({ ...dto, organizationId, createdBy: userId });
    return this.repo.save(item);
  }

  async update(id: string, organizationId: string, dto: ContactBodyDto, userId: string) {
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
