import { Injectable } from '@nestjs/common';
import { CommonService } from '../common/common.service';
import {
  createPushMessage,
  createMergeMessage,
  createNoteMessage,
  createBambooBuildMessage,
} from '../helper/messager';
import {
  HookEventEnum,
  HookEventType,
  PushEventJSON,
  MergeEventJSON,
  NoteEventJSON,
} from './interfaces/gitlab.interface';

@Injectable()
export class WebhooksService {
  constructor(private commonService: CommonService) {}

  async handleGitlab(
    robotId: string,
    hookType: HookEventType,
    body: any,
  ): Promise<any> {
    let message = undefined as any;

    console.log('%c Line:24 🥥 hookType', 'color:#fca650', hookType);

    switch (hookType) {
      case HookEventEnum.Push_Hook:
        message = createPushMessage(body as PushEventJSON);
        break;
      case HookEventEnum.Merge_Request_Hook:
        message = createMergeMessage(body as MergeEventJSON);
        break;
      case HookEventEnum.Note_Hook:
        message = createNoteMessage(body as NoteEventJSON);
        break;
      default:
        break;
    }

    return await this.commonService.postFeishu(robotId, message);
  }

  async handleBamboo(robotId: string, body: any): Promise<any> {
    const message = createBambooBuildMessage(body);
    return await this.commonService.postFeishu(robotId, message);
  }
}
