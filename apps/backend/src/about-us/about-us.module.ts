import { Module } from '@nestjs/common';
import { AboutUsController } from './about-us.controller';
import { AboutUsService } from './about-us.service';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AboutUsController],
  providers: [AboutUsService],
})
export class AboutUsModule {}
