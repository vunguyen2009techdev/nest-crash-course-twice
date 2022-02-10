import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
  // UsePipes,
  UseFilters,
  // UseFilters,
  UseInterceptors,
  CacheInterceptor,
  // CacheKey,
  CacheTTL,
  Render,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBody,
} from '@nestjs/swagger';
import { JobEntity } from './entities/job.entity';
// import * as Joi from 'joi';
import { JobDTO } from './dtos/job.dto';
import { JobsService } from './jobs.service';
import { Job } from './interfaces/job.interface';
import { JobData } from '../decorators/jobdata.decorator';
import { ValidationExceptionFilter } from '../filters/validation-exception.filter';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';
import { JobListDTO } from './dtos/jobList.dto';
// import { HttpExceptionFilter } from '../filters/http-exception.filter';
// import { JoiValidationPipe } from '../pipes/validation.pipe';

@ApiTags('jobs')
@Controller('jobs')
@UseInterceptors(CacheInterceptor, LoggingInterceptor)
// @UseFilters(new HttpExceptionFilter())
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // @Get()
  // @CacheKey('allJobs')
  // @CacheTTL(15)
  // findAll(): Promise<Job[]> {
  //   return this.jobsService.findAll();
  // }

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'The resource list has been successfully returned.',
  })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  @Render('jobs/index')
  root() {
    return this.jobsService.findAll().then((result) => new JobListDTO(result));
  }

  @Get(':id')
  @ApiOkResponse({
    status: 200,
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  @CacheTTL(30)
  find(@Param('id') id: string): Promise<Job> {
    return this.jobsService
      .find(id)
      .then((result) => {
        if (result) return result;
        throw new HttpException('Job Not Found', HttpStatus.NOT_FOUND);
      })
      .catch(() => {
        throw new HttpException('Job Not Found', HttpStatus.NOT_FOUND);
      });
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The resource has been successfully created.',
  })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: JobEntity })
  // @UsePipes(
  //   new JoiValidationPipe(
  //     Joi.object({
  //       title: Joi.string().min(3).required(),
  //       salary: Joi.number().integer().min(400).max(5000).required(),
  //     }),
  //   ),
  // )
  @UseFilters(new ValidationExceptionFilter())
  create(
    @JobData(new ValidationPipe({ validateCustomDecorators: true }))
    jobData: JobDTO,
  ): Promise<Job> {
    console.log('create: ', jobData);
    return this.jobsService.create(jobData);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'The resource has been successfully updated.' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: JobEntity })
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) job: JobDTO,
  ): Promise<Job> {
    console.log('update: ', { id, job });
    return this.jobsService.update(id, job);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The resource has been successfully removed.' })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden.' })
  delete(@Param('id') id: string): Promise<Job> {
    console.log('delete: ', id);
    return this.jobsService.delete(id);
  }
}
