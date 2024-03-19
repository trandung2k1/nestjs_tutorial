import { Controller, Get, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('PRODUCT_SERVICE') private clientProduct: ClientProxy,
    @Inject('ORDER_SERVICE') private clientOrder: ClientProxy,
  ) {}

  @Get('product/:id')
  getProduct(@Param('id') id: string) {
    return this.clientProduct.send({ cmd: 'GET_PRODUCT_BY_ID' }, +id);
  }

  @Get('order/:id')
  getOrder(@Param('id') id: string) {
    return this.clientOrder.send({ cmd: 'GET_ORDER_BY_ID' }, +id);
  }
}
