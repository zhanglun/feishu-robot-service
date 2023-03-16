import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  HttpStatus,
  Headers,
  Body,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('custom/message')
  async sendToFeishu(
    @Req() req: Request,
    @Res() res: Response,
    @Headers() headers,
    @Body() body,
  ) {
    await this.appService.sendToFeishu(body.text);

    res.status(HttpStatus.OK).send('ok');
  }
}
