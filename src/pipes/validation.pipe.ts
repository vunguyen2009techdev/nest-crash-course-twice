import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    console.log('- value validation: ', value);
    const { error } = this.schema.validate(value);
    if (error) {
      console.log('here error: ', error);
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
