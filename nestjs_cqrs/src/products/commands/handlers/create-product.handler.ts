import { ICommandHandler, CommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateProductCommand } from '../impl/create-product.command';
import { ProductCreatedEvent } from 'src/products/events/impl/product-created.event';
import { v4 as uuidv4 } from 'uuid';
import { ProductsService } from 'src/products/products.service';

class CreateProduct {
  constructor(
    public id: string,
    public name: string,
    public quantity: number,
  ) {}
}

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductsService,
  ) {}

  async execute(command: CreateProductCommand) {
    const { name, quantity } = command;
    const id = uuidv4();
    const product = new CreateProduct(id, name, quantity);
    const convertId = await this.convertStringToBinary(id);
    this.sendEvent(convertId, this.eventBus);
    return this.service.createProduct(product);
  }

  private async sendEvent(productId: Buffer, eventBus: EventBus) {
    if (productId !== undefined) {
      console.log('Send event Product Created');
      eventBus.publish(
        new ProductCreatedEvent(Buffer.from(productId).toString('hex')),
      );
    }
  }

  private async convertStringToBinary(uuid: string): Promise<Buffer> {
    const guid = Buffer.alloc(16);
    guid.write(uuid);
    return guid;
  }
}
