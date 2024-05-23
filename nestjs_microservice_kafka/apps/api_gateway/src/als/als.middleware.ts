import { Injectable, NestMiddleware } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class AlsMiddleware implements NestMiddleware {
  constructor(private readonly als: AsyncLocalStorage<any>) {}

  use(req: any, res: any, next: () => void) {
    const store = {
      authorization: req.headers['authorization'],
      userId: req.headers['x-user-id'],
    };
    this.als.run(store, () => {
      next();
    });
  }
}
