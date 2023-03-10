import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { WebhooksController } from './webhooks/webhooks.controller';
import { WebhooksService } from './webhooks/webhooks.service';
// import { WebhooksModule } from './webhooks/webhooks.module';
import { CommonModule } from './common/common.module';

@Module({
  // imports: [WebhooksModule],
  controllers: [AppController, CatsController, WebhooksController],
  providers: [AppService, CatsService, WebhooksService],
  imports: [CommonModule],
})
export class AppModule {}
