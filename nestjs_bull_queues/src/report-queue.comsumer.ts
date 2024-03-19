import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';

@Processor('REPORT_QUEUE')
export class ReportQueueConsumer {
  @Process('GEN_REPORT')
  async generateReport(job: Job<unknown>) {
    console.log('Job is starting with ID ' + job.id);
    console.log(job.data);
    const n = 1000;
    for (let i = 0; i <= n; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          let total = 0;
          total += i;
          job.log(`Data : ` + i);
          resolve(i);
          job.progress(((total / n) * 100).toFixed(1));
        }, 1000);
      });
    }
    console.log('Job is done with ID ' + job.id);
    return { done: true };
  }

  @OnQueueFailed()
  handler(job: Job, error: Error) {
    console.log(job, error.message);
    console.log('fired exception');
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name} `);
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`Completed job ${job.id} of type ${job.name}. `);
  }
}
