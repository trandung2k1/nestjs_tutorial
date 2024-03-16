import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProductHandler } from './commands/handlers/create-product.handler';
import { ProductsSagas } from './sagas/products.saga';
import { ProductCreatedHandler } from './events/handlers/product-create.handler';
export const CommandHandlers = [CreateProductHandler];
export const QueryHandlers = [];
export const EventHandlers = [ProductCreatedHandler];
@Module({
  imports: [CqrsModule],
  providers: [
    ProductsService,
    ProductsSagas,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
