import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'account_service_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  getNotifications() {
    return this.client.send<any, any>('notifications', [1, 2, 3, 4, 5]);
  }
}
