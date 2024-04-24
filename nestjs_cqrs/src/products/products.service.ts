import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  async createProduct(model: any) {
    console.log('Service CreateProduct');
    return model;
  }
}
