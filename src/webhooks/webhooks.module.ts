import { Module } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';

@Module({
  controllers: [WebhooksController],
  providers: [WebhooksService],
  imports: [CommonService],
})
export class WebhooksModule {}
