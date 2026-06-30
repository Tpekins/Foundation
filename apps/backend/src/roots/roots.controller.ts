import { Controller, Get, Patch, Param, Body, UseGuards, ValidationPipe, Inject } from '@nestjs/common';
import { RootsService } from './roots.service';
import { AdminGuard } from '../admin.guard';
import { UpdateRootsDto } from './dto/update-roots.dto';

@Controller('api/roots')
export class RootsController {
  constructor(@Inject(RootsService) private readonly rootsService: RootsService) {}

  @Get()
  async getRoots() {
    return this.rootsService.getRoots();
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  async update(@Param('id') id: string, @Body(ValidationPipe) body: UpdateRootsDto) {
    return this.rootsService.update(id, body);
  }
}
