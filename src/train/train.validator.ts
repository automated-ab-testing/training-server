import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isValidCron } from 'cron-validator';

@ValidatorConstraint({ name: 'isCronExpression', async: false })
export class CronExpression implements ValidatorConstraintInterface {
  validate(text: string) {
    return isValidCron(text, { seconds: true });
  }
}
