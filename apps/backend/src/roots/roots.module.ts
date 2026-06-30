import { Module } from '@nestjs/common';
import { RootsController } from './roots.controller';
import { RootsService } from './roots.service';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RootsController],
  providers: [RootsService],
})
export class RootsModule {}
