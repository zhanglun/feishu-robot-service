import { Injectable } from '@nestjs/common';
import { CommonService } from '../common/common.service';
import {
  createPushMessage,
  createMergeMessage,
  createNoteMessage,
  createBambooBuildMessage,
} from '../helper/messager';
import {
  createSentryErrorMessage,
  createSentryIssueMessage,
  createSentryEventAlertMessage,
  HookResourceEnum,
  HookResourceType,
  SentryJSON,
} from '../helper/message/createSentryMessage';
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

  async handleSentry(
    robotId: string,
    hookType: HookResourceType,
    body: any,
  ): Promise<any> {
    let message = undefined as any;

    switch (hookType) {
      case HookResourceEnum.EVENT_ALERT:
        message = createSentryEventAlertMessage(body as SentryJSON);
        break;
      case HookResourceEnum.ISSUE:
        message = createSentryIssueMessage(body as SentryJSON);
        break;
      case HookResourceEnum.ERROR:
        message = createSentryErrorMessage(body as SentryJSON);
        break;
      default:
        break;
    }

    return await this.commonService.postFeishu(robotId, message);
  }
}
