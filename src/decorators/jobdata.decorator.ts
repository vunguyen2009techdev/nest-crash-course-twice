import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const JobData = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    return data ? req.body && req.body[data] : req.body;
  },
);
