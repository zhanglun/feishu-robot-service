import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { createPushMessage } from 'src/helper/messager';
import {
  HookEventEnum,
  HookEventType,
  PushEventJSON,
} from './interfaces/gitlab.interface';

@Injectable()
export class WebhooksService {
  constructor(private commonService: CommonService) {}

  async handleGitlab(hookType: HookEventType, body: any): Promise<any> {
    switch (hookType) {
      case HookEventEnum.Push_Hook:
        const message = createPushMessage(body as PushEventJSON);

        return await this.commonService.postFeishu(message);
      case HookEventEnum.Merge_Request_Hook:
        console.log('aaaa merge  hook');
        break;
      default:
        break;
    }
  }
}
