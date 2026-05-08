import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepo.find({
      select: ['id', 'organizationId', 'firstName', 'lastName', 'email', 'role', 'isActive', 'emailVerified', 'lastLoginAt', 'createdAt'],
    });
  }

  findOne(id: string) {
    return this.usersRepo.findOne({
      where: { id },
      select: ['id', 'organizationId', 'firstName', 'lastName', 'email', 'role', 'isActive', 'emailVerified', 'lastLoginAt', 'createdAt'],
    });
  }
}
