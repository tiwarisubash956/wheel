import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ServiceCenterService } from '../service-center/service-center.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateServiceCenterDto } from '../dto/create-service-center.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly serviceCenterService: ServiceCenterService,
  ) {}

  async registerUser(registerData: CreateUserDto) {
    const hashPassword = await bcrypt.hash(registerData.password, 10);

    const data = await this.userService.create({
      ...registerData,
      password: hashPassword,
    });
    const payload = { email: data.email, sub: data.id, role: data.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerServiceCenter(registerData: CreateServiceCenterDto) {
    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    const data = await this.serviceCenterService.create({
      ...registerData,
      password: hashedPassword,
    });
    const payload = { email: data.email, sub: data.id, role: data.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    const serviceCenter = await this.serviceCenterService.findByEmail(email);

    if (!user && !serviceCenter) {
      throw new UnauthorizedException('Invalid credentials');
    }

    let isPasswordValid = false;

    if (user) {
      isPasswordValid = await bcrypt.compare(password, user.password);
    }

    if (serviceCenter) {
      isPasswordValid =
        isPasswordValid ||
        (await bcrypt.compare(password, serviceCenter.password));
    }

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: user ? user.email : serviceCenter.email,
      sub: user ? user.id : serviceCenter.id,
    };

    // Return the JWT token
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
