import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to Feishu Automatic Robot';
  }

  sendToFeishu(): string {
    return 'send to feishu message';
  }
}
