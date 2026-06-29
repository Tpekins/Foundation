import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, ValidationPipe, Inject } from '@nestjs/common';
import { InitiativesService } from './initiatives.service';
import { AdminGuard } from '../admin.guard';
import { CreateInitiativeDto } from './dto/create-initiative.dto';
import { UpdateInitiativeDto } from './dto/update-initiative.dto';

@Controller('api/initiatives')
export class InitiativesController {
  constructor(@Inject(InitiativesService) private readonly initiativesService: InitiativesService) {}

  @Get()
  async findAll() {
    return this.initiativesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.initiativesService.findOne(id);
  }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body(ValidationPipe) body: CreateInitiativeDto) {
    return this.initiativesService.create(body);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  async update(@Param('id') id: string, @Body(ValidationPipe) body: UpdateInitiativeDto) {
    return this.initiativesService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string) {
    return this.initiativesService.remove(id);
  }
}
