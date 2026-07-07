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

  @Get(':section')
  async getRootsBySection(@Param('section') section: string) {
    return this.rootsService.getRootsBySection(section);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  async update(@Param('id') id: string, @Body(ValidationPipe) body: UpdateRootsDto) {
    return this.rootsService.update(id, body);
  }

  @Patch('section/:section')
  @UseGuards(AdminGuard)
  async updateBySection(@Param('section') section: string, @Body(ValidationPipe) body: UpdateRootsDto) {
    return this.rootsService.updateBySection(section, body);
  }
}
