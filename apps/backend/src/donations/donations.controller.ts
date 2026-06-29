import { Controller, Get, Post, Delete, Param, Body, UseGuards, ValidationPipe, Inject } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { AdminGuard } from '../admin.guard';
import { CreateDonationDto } from './dto/create-donation.dto';

@Controller('api/donations')
export class DonationsController {
  constructor(@Inject(DonationsService) private readonly donationsService: DonationsService) {}

  @Post()
  async createDonation(@Body(ValidationPipe) body: CreateDonationDto) {
    return this.donationsService.create(body);
  }

  @Get()
  async findAll() {
    return this.donationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.donationsService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string) {
    return this.donationsService.remove(id);
  }
}
