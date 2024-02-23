import { IsNumber, IsOptional, IsUUID, Validate } from 'class-validator';
import { CronExpression } from '~/src/train/train.validator';

export class AddTrainDto {
  @IsUUID()
  readonly testId: string;

  @Validate(CronExpression, { message: 'Invalid cron expression' })
  readonly schedule: string;

  @IsNumber()
  @IsOptional()
  readonly limit?: number;
}

export class DeleteTrainDto {
  @IsUUID()
  readonly testId: string;
}
