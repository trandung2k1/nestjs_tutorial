import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  id: number;
}

@InputType()
export class CreateUserModel {
  @Field()
  name: string;

  @Field()
  email: string;
}
