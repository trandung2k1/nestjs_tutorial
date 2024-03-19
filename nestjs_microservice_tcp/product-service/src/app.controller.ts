import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  private readonly products = [
    {
      productId: 1,
      productName: 'IPhone 15 Pro Max',
      price: 1500,
    },
    {
      productId: 2,
      productName: 'IPhone 4 Pro Max',
      price: 1300,
    },
  ];
  constructor(
    private readonly appService: AppService,
    @Inject('ORDER_SERVICE') private clientOrder: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'GET_PRODUCT_BY_ID' })
  getProductById(payload: number) {
    const product = this.products.find((p) => p.productId === payload);
    if (!product)
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    return product;
  }

  @EventPattern('CREATE_ORDER_SUCESS')
  crateOrderSuccess(payload) {
    console.log(payload);
  }

  @Get('buy')
  buy() {
    return this.clientOrder.send({ cmd: 'CREATE_ORDER' }, this.products);
  }
}
