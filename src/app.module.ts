import { Module,MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { HelloModule } from './modules/hello/hello.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ExceptionModule } from './modules/exception/exception.module';

@Module({
  imports: [HelloModule, ExceptionModule]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // 为 hello 路由添加中间件
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'hello', method: RequestMethod.POST })
      .forRoutes('hello');
  }
}
