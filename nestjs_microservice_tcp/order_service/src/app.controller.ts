import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
@Controller()
export class AppController {
  private orders = [
    {
      orderId: 1,
      products: [
        { productId: 1, productName: 'IPhone 15 Pro Max', price: 1500 },
        { productId: 2, productName: 'IPhone 4 Pro Max', price: 1300 },
      ],
    },
    {
      orderId: 2,
      products: [
        { productId: 1, productName: 'IPhone 15 Pro Max', price: 1500 },
        { productId: 2, productName: 'IPhone 4 Pro Max', price: 1300 },
      ],
    },
  ];
  constructor(
    private readonly appService: AppService,
    @Inject('PRODUCT_SERVICE') private clientProduct: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'CREATE_ORDER' })
  crateUser(products: any[]) {
    const id = uuidv4();
    const createOrder = {
      id,
      products,
    };
    this.clientProduct.emit<number>('CREATE_ORDER_SUCESS', createOrder);
    return createOrder;
  }

  @MessagePattern({ cmd: 'GET_ORDER_BY_ID' })
  getOrderById(payload: number) {
    const findOrder = this.orders.find((o) => o.orderId === payload);
    if (!findOrder)
      return new HttpException('Order not found', HttpStatus.NOT_FOUND);
    return findOrder;
  }
}
