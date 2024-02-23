import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TrainService {
  private readonly logger = new Logger(TrainService.name);

  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  addCronJob(name: string, schedule: string) {
    // Create a new cron job
    const job = new CronJob(schedule, () => {
      this.logger.warn(`schedule (${schedule}) for job ${name} to run!`);
    });

    // Add the job to the scheduler
    this.schedulerRegistry.addCronJob(name, job);

    // Start the job
    job.start();

    // Log a message
    this.logger.warn(`job ${name} added with schedule: ${schedule}!`);
  }

  deleteCronJob(name: string) {
    // Delete the job from the scheduler
    this.schedulerRegistry.deleteCronJob(name);

    // Log a message
    this.logger.warn(`job ${name} deleted!`);
  }
}
