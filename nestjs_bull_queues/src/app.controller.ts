import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { queuePool } from './bull-board/queue-pool';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectQueue('REPORT_QUEUE') readonly queue: Queue,
  ) {
    queuePool.add(queue);
  }

  @Get()
  getHello() {
    let total = 0;
    for (let i = 0; i <= 10000000000; i++) {
      total += i;
    }
    return total;
  }

  @Get('/gen-report/:type')
  async genReport(@Param('type') type: string) {
    return this.appService.genReport(type);
  }
}
