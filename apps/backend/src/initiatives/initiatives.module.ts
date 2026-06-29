import { Module } from '@nestjs/common';
import { InitiativesController } from './initiatives.controller';
import { InitiativesService } from './initiatives.service';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InitiativesController],
  providers: [InitiativesService],
})
export class InitiativesModule {}
