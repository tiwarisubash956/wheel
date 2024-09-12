import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phoneNo: string;

  @Column()
  name: string;

  @Column({ default: 'user' })
  role: string;
}
