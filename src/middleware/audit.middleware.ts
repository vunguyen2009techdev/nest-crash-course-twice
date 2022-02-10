import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    console.log(`Logging DELETE request IP => ${req.ip}`);
    console.log(`Logging DELETE request Path => ${req.path}`);
    console.log(`Logging DELETE request Headers => ${req.headers}`);
    next();
  }
}
