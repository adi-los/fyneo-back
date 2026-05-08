import { Controller, Get, Post, Patch, Delete, Param, Query, Body, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CustomerService } from './customer.service';
import { QueryCustomerDto, CustomerBodyDto } from './customer.dto';

@Controller('onboarding/customers')
@UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Get()
  findAll(@Req() req: any, @Query() query: QueryCustomerDto) {
    return this.service.findAll(req.user.organizationId, query);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.service.findOne(id, req.user.organizationId);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CustomerBodyDto) {
    return this.service.create(req.user.organizationId, dto, req.user.sub);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: CustomerBodyDto) {
    return this.service.update(id, req.user.organizationId, dto, req.user.sub);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.service.remove(id, req.user.organizationId);
  }
}
