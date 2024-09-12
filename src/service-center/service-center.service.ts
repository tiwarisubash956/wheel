import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceCenter } from '../entities/service-center.entity';
import { CreateServiceCenterDto } from '../dto/create-service-center.dto';

@Injectable()
export class ServiceCenterService {
  constructor(
    @InjectRepository(ServiceCenter)
    private serviceCentersRepository: Repository<ServiceCenter>,
  ) {}

  async create(
    createServiceCenterDto: CreateServiceCenterDto,
  ): Promise<ServiceCenter> {
    const serviceCenter = this.serviceCentersRepository.create(
      createServiceCenterDto,
    );
    return this.serviceCentersRepository.save(serviceCenter);
  }

  async findByEmail(email: string): Promise<ServiceCenter> {
    return this.serviceCentersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<ServiceCenter> {
    return this.serviceCentersRepository.findOne({ where: { id } });
  }

  //admin
  async findall(): Promise<ServiceCenter[]> {
    return this.serviceCentersRepository.find();
  }
}
