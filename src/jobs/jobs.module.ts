import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  CacheModule,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { JobSchema } from './schemas/job.schema';
import { AuditMiddleware } from '../middleware/audit.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Job', schema: JobSchema }]),
    // CacheModule.register({
    //   ttl: 5,
    //   max: 10,
    // }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuditMiddleware)
      .forRoutes({ path: 'jobs/*', method: RequestMethod.DELETE });
  }
}
