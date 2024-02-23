import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { PrismaService } from '~/src/prisma/prisma.service';

@Injectable()
export class TrainService {
  private readonly logger = new Logger(TrainService.name);

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly prismaService: PrismaService,
  ) {}

  addCronJob(testId: string, schedule: string, limit?: number) {
    // Create a new cron job
    const job = new CronJob(schedule, async () => {
      const eventLogs = await this.prismaService.eventLog.findMany({
        where: {
          version: {
            testId,
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
        select: {
          version: {
            select: {
              label: true,
            },
          },
          isClicked: true,
        },
        take: limit,
      });

      // TODO: Train the model with the event logs
      this.logger.log(eventLogs);
    });

    // Add the job to the scheduler
    this.schedulerRegistry.addCronJob(testId, job);

    // Start the job
    job.start();

    // Log a message
    this.logger.log(`job ${testId} added with schedule: ${schedule}!`);
  }

  deleteCronJob(testId: string) {
    // Delete the job from the scheduler
    this.schedulerRegistry.deleteCronJob(testId);

    // Log a message
    this.logger.log(`job ${testId} deleted!`);
  }
}
