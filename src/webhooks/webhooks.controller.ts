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
import { Response } from 'express';
import { HookEventType } from './interfaces/gitlab.interface';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private webhooksService: WebhooksService) {}

  @Get('/gitlab')
  async gitlab(@Res() res: Response) {
    res.status(HttpStatus.OK).send('OK');
  }

  @Post('/gitlab')
  async PostToGitLab(
    @Req() req: Request,
    @Res() res: Response,
    @Headers() headers,
    @Body() body,
  ) {
    const event: HookEventType = headers['x-gitlab-event'];
    const message = await this.webhooksService.handleGitlab(event, body);

    res.status(HttpStatus.OK).send('ok');
  }
}
