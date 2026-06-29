import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma.module';
import { InitiativesModule } from './initiatives/initiatives.module';
import { FieldLogsModule } from './field-logs/field-logs.module';
import { AboutUsModule } from './about-us/about-us.module';
import { DonationsModule } from './donations/donations.module';
import { AdminGuard } from './admin.guard';

@Module({
  imports: [PrismaModule, InitiativesModule, FieldLogsModule, AboutUsModule, DonationsModule],
  controllers: [AppController],
  providers: [AdminGuard],
})
export class AppModule {}
