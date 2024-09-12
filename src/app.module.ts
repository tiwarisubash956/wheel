import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ServiceCenterModule } from './service-center/service-center.module';
import { User } from './entities/user.entity';
import { ServiceCenter } from './entities/service-center.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Use localhost since you're accessing it from your local machine
      port: 5432, // The port mapped in docker-compose
      username: 'user', // Your PostgreSQL username
      password: 'user123', // Your PostgreSQL password
      database: 'wheel', // Your PostgreSQL database name
      entities: [User, ServiceCenter],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    ServiceCenterModule,
  ],
})
export class AppModule {}
