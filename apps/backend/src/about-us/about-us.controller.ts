import { Controller, Get, Patch, Delete, Param, Body, UseGuards, ValidationPipe, Inject } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { AdminGuard } from '../admin.guard';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';

@Controller('api/about-us')
export class AboutUsController {
  constructor(@Inject(AboutUsService) private readonly aboutUsService: AboutUsService) {}

  @Get()
  async getAboutUs() {
    return this.aboutUsService.getAboutUs();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.aboutUsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  async update(@Param('id') id: string, @Body(ValidationPipe) body: UpdateAboutUsDto) {
    return this.aboutUsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string) {
    return this.aboutUsService.remove(id);
  }
}
