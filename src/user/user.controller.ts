import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async register() {
    return 'this is user endpoint ';
  }

  //admin
  @Get('/alluser')
  async findall() {
    return this.userService.findall();
  }
}
