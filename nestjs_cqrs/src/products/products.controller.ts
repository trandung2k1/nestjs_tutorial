import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProductCommand } from './commands/impl/create-product.command';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;
}

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('created')
  async create(@Body() model: CreateProductDto) {
    console.log(model);
    try {
      return await this.commandBus.execute(
        new CreateProductCommand(model.name, model.quantity),
      );
    } catch (errors) {
      console.log(
        'Caught promise rejection (validation failed). Errors: ',
        errors,
      );
    }
  }
}
