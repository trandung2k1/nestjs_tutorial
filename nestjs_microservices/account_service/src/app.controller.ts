import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('notifications')
  getNotifications(@Payload() numbers: number[], @Ctx() context: RmqContext) {
    const originalMsg = context.getMessage();
    const channel = context.getChannelRef();
    // console.log(numbers);
    channel.ack(originalMsg);
    return numbers;
  }
}
