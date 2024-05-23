import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlsMiddleware } from 'apps/api_gateway/src/als/als.middleware';
import { AlsModule } from 'apps/api_gateway/src/als/als.module';

@Module({
  imports: [AlsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AlsMiddleware).forRoutes('*');
  }
}
