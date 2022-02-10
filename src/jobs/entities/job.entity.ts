import { ApiProperty } from '@nestjs/swagger';

export class JobEntity {
  @ApiProperty({
    type: String,
    description: 'The title of the job position',
    default: 'JavaScript Developer',
  })
  readonly title: string;
  @ApiProperty({
    type: Number,
    description: 'The salary to be paid for the job position',
    default: 5000,
  })
  readonly salary: number;
}
