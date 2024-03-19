import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  private readonly products = [
    {
      id: 1,
      name: 'Iphone 15 Pro Max',
    },
    {
      id: 2,
      name: 'Macbook Pro',
    },
  ];
  constructor(
    private readonly appService: AppService,
    @Inject('ORDER_SERVICE') private client: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('buy')
  buy() {
    const order = this.client.send('order_create', this.products);
    order.subscribe(
      (data) => this.client.emit('order_success', data),
      null,
      () => {
        console.log('Done!');
      },
    );

    return order;
  }
}
