import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { v4 as uuidv4 } from 'uuid';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('order_create')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createOrder(@Payload() payload: any[], @Ctx() context: RedisContext) {
    // const channel = context.getChannel();
    // console.log(channel);
    // console.log(context.getArgs());
    // console.log(context.getArgByIndex(0));
    const order = {
      id: uuidv4(),
      products: payload,
      user: {
        email: 'trandungksnb00@gmail.com',
      },
    };
    return order;
  }

  @EventPattern('order_success')
  async handleOrderSuccess(order: any) {
    const mail = {
      to: order.user.email,
      message: `Your order is crated successfully`,
    };
    console.log(mail);
  }
}
