import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
// import { queuePool } from './bull-board/queue-pool';

@Injectable()
export class AppService {
  constructor(@InjectQueue('REPORT_QUEUE') private queue: Queue) {
    // queuePool.add(queue);
    this.setUp();
  }
  getHello(): string {
    return 'Hello World!';
  }

  async setUp() {
    await this.cleanAllQueues();
  }

  async cleanAllQueues() {
    await this.cleanQueue(this.queue);
  }

  async genReport(type: string) {
    return this.queue.add(
      'GEN_REPORT',
      { type },
      {
        priority: 1,
      },
    );
  }
  async cleanQueue(queue: Queue) {
    await queue.empty();
    await queue.clean(0, 'wait');
    await queue.clean(0, 'completed');
    await queue.clean(0, 'active');
    await queue.clean(0, 'failed');
  }
}
