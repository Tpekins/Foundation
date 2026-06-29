import { Module } from '@nestjs/common';
import { FieldLogsController } from './field-logs.controller';
import { FieldLogsService } from './field-logs.service';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FieldLogsController],
  providers: [FieldLogsService],
})
export class FieldLogsModule {}
