import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const req: Request = ctx.getRequest<Request>();
    console.log(`Endpoint: ${req.url}`);
    console.log(`Method: ${req.method}`);

    console.log('Before...');
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After...${Date.now() - now}ms`)));
  }
}
