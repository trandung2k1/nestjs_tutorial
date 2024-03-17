import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { WsAdapter } from './events/ws-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const adapter = new WsAdapter(app);
  app.useWebSocketAdapter(adapter);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
