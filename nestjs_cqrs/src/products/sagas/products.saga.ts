import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ProductCreatedEvent } from '../events/impl/product-created.event';

@Injectable()
export class ProductsSagas {
  constructor() {}
  @Saga()
  productCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductCreatedEvent),
      delay(1000),
      map((event) => {
        console.log('Event: ', event);
        console.log('Inside [ProductsSagas] Saga ');
        return null;
      }),
    );
  };
}
