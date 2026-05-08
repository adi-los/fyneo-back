import { Controller, Get, Post, Patch, Delete, Param, Query, Body, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ContactService } from './contact.service';
import { QueryContactDto, ContactBodyDto } from './contact.dto';

@Controller('onboarding/contacts')
@UseGuards(JwtAuthGuard)
export class ContactController {
  constructor(private readonly service: ContactService) {}

  @Get()
  findAll(@Req() req: any, @Query() query: QueryContactDto) {
    return this.service.findAll(req.user.organizationId, query);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.service.findOne(id, req.user.organizationId);
  }

  @Post()
  create(@Req() req: any, @Body() dto: ContactBodyDto) {
    return this.service.create(req.user.organizationId, dto, req.user.sub);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: ContactBodyDto) {
    return this.service.update(id, req.user.organizationId, dto, req.user.sub);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.service.remove(id, req.user.organizationId);
  }
}
