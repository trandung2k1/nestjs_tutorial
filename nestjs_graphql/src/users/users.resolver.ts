import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserModel, UserModel } from './models';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserModel])
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Mutation(() => UserModel)
  async createUser(@Args('payload') input: CreateUserModel) {
    console.log(input);
    return this.usersService.createUser(input);
  }
}
