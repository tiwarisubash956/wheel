import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ServiceCenter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  serviceCenterName: string;

  @Column()
  vehicleType: string;

  @Column()
  serviceCenterSpecification: string;

  @Column()
  address: string;

  @Column()
  panNo: string;

  @Column({ default: 'service-center' })
  role: string;
}
