import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { interval, map } from 'rxjs';
class OrderCreatedEvent {
  public orderId: number;
  public payload: object;
  constructor(orderId: number, payload: object) {
    this.orderId = orderId;
    this.payload = payload;
  }
}
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get()
  getHello() {
    // return this.appService.getHello();
    const data = new OrderCreatedEvent(1, {});
    // this.eventEmitter.emit('order.created', data);
    this.sse();
    return data;
  }

  @OnEvent('order.created', { async: true })
  handleOrderCreatedEvent(payload: OrderCreatedEvent) {
    //save data to db
    console.log(payload);
  }

  @Sse('sse')
  sse() {
    // return { data: { hello: 'world' } };
    return interval(1000).pipe(map(() => ({ data: { hello: 'world' } })));
  }
}
