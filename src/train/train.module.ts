import { Module } from '@nestjs/common';
import { TrainService } from '~/src/train/train.service';
import { TrainController } from '~/src/train/train.controller';
import { PrismaModule } from '~/src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TrainController],
  providers: [TrainService],
})
export class TrainModule {}
