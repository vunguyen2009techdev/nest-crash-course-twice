import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './interfaces/job.interface';
import { JobDTO } from './dtos/job.dto';

@Injectable()
export class JobsService {
  constructor(@InjectModel('Job') private readonly jobModel: Model<Job>) {}

  async findAll(): Promise<Job[]> {
    return await this.jobModel.find().exec();
  }

  async find(id: string): Promise<Job> {
    return await this.jobModel.findOne({ _id: id }).exec();
  }

  async create(job: JobDTO): Promise<Job> {
    return await this.jobModel.create(job);
  }

  async update(id: string, job: JobDTO): Promise<Job> {
    return await this.jobModel.findByIdAndUpdate(id, job, { new: true });
  }

  async delete(id: string): Promise<Job> {
    return await this.jobModel.findByIdAndRemove(id).exec();
  }
}
