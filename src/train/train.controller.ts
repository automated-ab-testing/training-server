import { Body, Controller, Delete, HttpException, Post } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { TrainService } from '~/src/train/train.service';
import { AddTrainDto, DeleteTrainDto } from '~/src/train//train.input-dto';

@Controller('train')
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @Post()
  addCronJob(@Body() body: AddTrainDto) {
    // Extract the name and schedule from the body
    const { name, schedule } = body;

    try {
      // Run the addCronJob method from the train service
      this.trainService.addCronJob(name, schedule);
    } catch (error) {
      // If there is an error, throw a new HttpException
      throw new HttpException(
        (error as Error).message,
        StatusCodes.BAD_REQUEST,
      );
    }
  }

  @Delete()
  deleteCronJob(@Body() body: DeleteTrainDto) {
    // Extract the name from the body
    const { name } = body;

    try {
      // Run the deleteCronJob method from the train service
      this.trainService.deleteCronJob(name);
    } catch (error) {
      // If there is an error, throw a new HttpException
      throw new HttpException(
        (error as Error).message,
        StatusCodes.BAD_REQUEST,
      );
    }
  }
}
