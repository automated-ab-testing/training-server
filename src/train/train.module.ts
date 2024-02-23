import { Module } from '@nestjs/common';
import { TrainService } from '~/src/train/train.service';
import { TrainController } from '~/src/train/train.controller';

@Module({
  controllers: [TrainController],
  providers: [TrainService],
})
export class TrainModule {}
