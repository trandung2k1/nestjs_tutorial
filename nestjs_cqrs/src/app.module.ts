import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CqrsModule } from '@nestjs/cqrs';
// import { HeroesGameModule } from './heroes-game/heroes-game.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
    CqrsModule,
    // HeroesGameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
