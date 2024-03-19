import { Injectable } from '@nestjs/common';
import { UserModel } from './models';

@Injectable()
export class UsersService {
  private users: UserModel[] = [
    {
      id: 1,
      name: 'Jon',
      email: 'jon@gmail.com',
    },
    {
      id: 2,
      name: 'Doe',
      email: 'Doe@gmail.com',
    },
  ];

  getAllUsers() {
    return this.users;
  }

  createUser({ name, email }) {
    this.users.push({
      name,
      email,
      id: this.users.length + 1,
    });
    return this.users[this.users.length - 1];
  }
}
