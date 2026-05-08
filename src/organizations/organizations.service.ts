import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../database/entities/organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepo: Repository<Organization>,
  ) {}

  findAll() {
    return this.orgRepo.find();
  }

  findOne(id: string) {
    return this.orgRepo.findOne({ where: { id } });
  }
}
