import { Controller, Get, Post, Patch, Delete, Param, Query, Body, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { SupplierService } from './supplier.service';
import { QuerySupplierDto, SupplierBodyDto } from './supplier.dto';

@Controller('onboarding/suppliers')
@UseGuards(JwtAuthGuard)
export class SupplierController {
  constructor(private readonly service: SupplierService) {}

  @Get()
  findAll(@Req() req: any, @Query() query: QuerySupplierDto) {
    return this.service.findAll(req.user.organizationId, query);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.service.findOne(id, req.user.organizationId);
  }

  @Post()
  create(@Req() req: any, @Body() dto: SupplierBodyDto) {
    return this.service.create(req.user.organizationId, dto, req.user.sub);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: SupplierBodyDto) {
    return this.service.update(id, req.user.organizationId, dto, req.user.sub);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.service.remove(id, req.user.organizationId);
  }
}
