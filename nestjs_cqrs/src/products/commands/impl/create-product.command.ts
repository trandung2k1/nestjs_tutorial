export class CreateProductCommand {
  constructor(
    public readonly name: string,
    public readonly quantity: number,
  ) {}
}
