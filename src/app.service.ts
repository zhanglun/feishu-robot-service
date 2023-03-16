import { Injectable } from '@nestjs/common';
import { CommonService } from './common/common.service';
import { MessageTypeEnum } from './common/message.interface';

@Injectable()
export class AppService {
  constructor(private commonService: CommonService) {}

  getHello(): string {
    return 'Welcome to Feishu Automatic Robot';
  }

  async sendToFeishu(text): Promise<string> {
    const message = {
      msg_type: MessageTypeEnum.INTERACTIVE,
      card: {
        config: {
          wide_screen_mode: true,
        },
        header: {
          template: 'purple',
          title: {
            content: text,
            tag: 'plain_text',
          },
        },
        elements: [],
      },
    };

    // await this.commonService.postFeishu(message);

    return 'send to feishu message';
  }
}
