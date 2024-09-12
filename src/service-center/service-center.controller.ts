import { Body, Controller, Get, Post } from '@nestjs/common';
import { ServiceCenterService } from './service-center.service';
import { CreateServiceCenterDto } from '../dto/create-service-center.dto';

@Controller('service-centers')
export class ServiceCenterController {
  constructor(private readonly serviceCenterService: ServiceCenterService) {}

  @Get('')
  async register() {
    return 'this is service center  endpoint ';
  }

  //admin
  @Get('/allService')
  async findall() {
    return this.serviceCenterService.findall();
  }
}
