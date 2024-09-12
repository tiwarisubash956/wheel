import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceCenter } from '../entities/service-center.entity';
import { ServiceCenterService } from './service-center.service';
import { ServiceCenterController } from './service-center.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceCenter])],
  providers: [ServiceCenterService],
  controllers: [ServiceCenterController],
  exports: [ServiceCenterService],
})
export class ServiceCenterModule {}
