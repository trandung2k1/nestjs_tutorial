import { Controller, Get } from '@nestjs/common';
import { ProductServiceService } from './product_service.service';

@Controller()
export class ProductServiceController {
  constructor(private readonly productServiceService: ProductServiceService) {}

  @Get()
  getHello(): string {
    return this.productServiceService.getHello();
  }
}
