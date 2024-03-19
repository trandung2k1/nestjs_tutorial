import { Module, OnModuleInit } from '@nestjs/common';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
})
export class CleanUpModule implements OnModuleInit {
  constructor(
    @InjectQueue('REPORT_QUEUE')
    private readonly reportQueue: Queue,
  ) {}
  async onModuleInit() {
    await this.cleanQueue(this.reportQueue);
    // Clean other queues as needed
  }

  private async cleanQueue(queue: Queue): Promise<void> {
    await queue.clean(0);
    // Clean other types of jobs as needed
  }
}
