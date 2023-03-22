import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  HttpStatus,
  Headers,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { HookEventType } from './interfaces/gitlab.interface';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(
    private webhooksService: WebhooksService,
    private configService: ConfigService,
  ) {}

  @Get('/gitlab')
  async gitlab(@Res() res: Response) {
    res.status(HttpStatus.OK).send('OK');
  }

  @Post('/test/:id')
  async test(
    @Req() req: Request,
    @Res() res: Response,
    @Headers() headers,
    @Body() body,
    @Param() params,
    @Query() query,
  ) {
    console.log('%c Line:26 🥟 id', 'color:#7f2b82', params);
    console.log('%c Line:30 🍪 body', 'color:#93c0a4', body);
    console.log('%c Line:31 🎂 query', 'color:#e41a6a', query);

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
    const robotId = this.configService.get('default_robot_id');

    await this.webhooksService.handleGitlab(robotId, event, body);

    res.status(HttpStatus.OK).send('ok');
  }

  @Post('/:robot_id/gitlab')
  async gitlabHook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers() headers,
    @Body() body,
    @Param() params,
  ) {
    const robotId: string = params.robot_id;
    const event: HookEventType = headers['x-gitlab-event'];

    await this.webhooksService.handleGitlab(robotId, event, body);

    res.status(HttpStatus.OK).send('ok');
  }

  @Post('/bamboo/build')
  async PostToBamboo(
    @Req() req: Request,
    @Res() res: Response,
    @Headers() headers,
    @Body() body,
  ) {
    const robotId = this.configService.get('default_robot_id');

    await this.webhooksService.handleBamboo(robotId, body);

    res.status(HttpStatus.OK).send('ok');
  }

  @Post('/:robot_id/bamboo/build')
  async bambooBuildHook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers() headers,
    @Param() params,
    @Body() body,
  ) {
    const robotId: string = params.robot_id;

    await this.webhooksService.handleBamboo(robotId, body);

    res.status(HttpStatus.OK).send('ok');
  }

  @Post('/:robot_id/sentry')
  async sentryHook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers() headers,
    @Param() params,
    @Body() body,
  ) {
    const robotId: string = params.robot_id;
    const hookType = headers['sentry-hook-resource'];

    console.log('%c Line:116 🍋 hookType', 'color:#e41a6a', hookType);
    console.log('%c Line:113 🍧 body', 'color:#e41a6a', body);

    const result = await this.webhooksService.handleSentry(
      robotId,
      hookType,
      body,
    );

    res.status(HttpStatus.OK).json(result);
  }
}
