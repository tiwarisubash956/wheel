import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateServiceCenterDto } from '../dto/create-service-center.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/user')
  async register(@Body() registerData: CreateUserDto) {
    return await this.authService.registerUser(registerData);
  }

  @Post('register/service-center')
  async registerServiceCenter(
    @Body()
    registerData: CreateServiceCenterDto,
  ) {
    return this.authService.registerServiceCenter(registerData);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
