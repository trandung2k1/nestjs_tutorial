import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { ReportQueueConsumer } from './report-queue.comsumer';
import { BullBoardController } from './bull-board/bull-board.controller';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
        lazyConnect: false,
        offlineQueue: false,
      },
      defaultJobOptions: {
        removeOnFail: true,
        removeOnComplete: true,
      },
    }),
    BullModule.registerQueue({
      name: 'REPORT_QUEUE',
    }),
  ],
  controllers: [AppController, BullBoardController],
  providers: [AppService, ReportQueueConsumer],
})
export class AppModule {}
