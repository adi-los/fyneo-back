import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../database/entities/user.entity';
import { RefreshToken } from '../database/entities/refresh-token.entity';

const JWT_SECRET = process.env.JWT_SECRET || 'fyneo-secret-key';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { email, isActive: true } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role, organizationId: user.organizationId };

    const accessToken = this.jwtService.sign(payload, { secret: JWT_SECRET, expiresIn: '15m' });
    const refreshTokenValue = this.jwtService.sign(payload, { secret: JWT_SECRET, expiresIn: '7d' });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.refreshTokenRepo.save({ userId: user.id, token: refreshTokenValue, expiresAt });
    await this.usersRepo.update(user.id, { lastLoginAt: new Date() });

    return {
      accessToken,
      refreshToken: refreshTokenValue,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        organizationId: user.organizationId,
      },
    };
  }

  async refresh(token: string) {
    const stored = await this.refreshTokenRepo.findOne({
      where: { token, isRevoked: false },
      relations: ['user'],
    });

    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    await this.refreshTokenRepo.update(stored.id, { isRevoked: true });

    const { user } = stored;
    const payload = { sub: user.id, email: user.email, role: user.role, organizationId: user.organizationId };

    const accessToken = this.jwtService.sign(payload, { secret: JWT_SECRET, expiresIn: '15m' });
    const refreshTokenValue = this.jwtService.sign(payload, { secret: JWT_SECRET, expiresIn: '7d' });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.refreshTokenRepo.save({ userId: user.id, token: refreshTokenValue, expiresAt });

    return { accessToken, refreshToken: refreshTokenValue };
  }

  async getMe(userId: string) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new UnauthorizedException();
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      organizationId: user.organizationId,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
      lastLoginAt: user.lastLoginAt,
    };
  }
}
