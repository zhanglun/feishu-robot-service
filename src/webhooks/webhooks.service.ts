import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { createPushMessage, createMergeMessage } from 'src/helper/messager';
import {
  HookEventEnum,
  HookEventType,
  PushEventJSON,
  MergeEventJSON,
} from './interfaces/gitlab.interface';

@Injectable()
export class WebhooksService {
  constructor(private commonService: CommonService) {}

  async handleGitlab(hookType: HookEventType, body: any): Promise<any> {
    let message = undefined as any;

    switch (hookType) {
      case HookEventEnum.Push_Hook:
        message = createPushMessage(body as PushEventJSON);
        break;
      case HookEventEnum.Merge_Request_Hook:
        message = createMergeMessage(body as MergeEventJSON);
        break;
      default:
        break;
    }

    return await this.commonService.postFeishu(message);
  }
}
