import { Controller, Dependencies, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
@Dependencies(UsersService)
export class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}
