import { Controller, Get, Patch, Delete, Param, Body, UseGuards, ValidationPipe, Inject } from '@nestjs/common';
import { FieldLogsService } from './field-logs.service';
import { AdminGuard } from '../admin.guard';
import { UpdateFieldLogDto } from './dto/update-field-log.dto';

@Controller('api/field-logs')
export class FieldLogsController {
  constructor(@Inject(FieldLogsService) private readonly fieldLogsService: FieldLogsService) {}

  @Get()
  async findAll() {
    return this.fieldLogsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.fieldLogsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  async update(@Param('id') id: string, @Body(ValidationPipe) body: UpdateFieldLogDto) {
    return this.fieldLogsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string) {
    return this.fieldLogsService.remove(id);
  }
}
