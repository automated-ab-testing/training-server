import { IsString, Validate } from 'class-validator';
import { CronExpression } from '~/src/train/train.validator';

export class AddTrainDto {
  @IsString()
  readonly name: string;

  @Validate(CronExpression, { message: 'Invalid cron expression' })
  readonly schedule: string;
}

export class DeleteTrainDto {
  @IsString()
  readonly name: string;
}
