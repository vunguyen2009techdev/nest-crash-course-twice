import { JobDTO } from './job.dto';

export class JobListDTO {
  constructor(public jobs: JobDTO[]) {}
}
