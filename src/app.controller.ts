import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @Get()
  // @Render('index')
  // root() {
  //   return this.appService.getHello();
  // }

  @Get()
  root(@Res() res: Response) {
    return res.render('index', {
      message: this.appService.getHello().message,
    });
  }
}
