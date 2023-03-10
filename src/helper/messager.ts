import {
  Commit,
  PushEventJSON,
} from 'src/webhooks/interfaces/gitlab.interface';
import { MessageTypeEnum } from 'src/common/message.interface';
import * as dayjs from 'dayjs';

/**
 * create commit block in feishu message
 * @param commits Commit[] commit data list
 * @returns any
 */

function createCommitBlock(commits: Commit[]) {
  const text = commits
    .map((commit, idx) => {
      return `${idx + 1}. [#${commit.id.slice(0, 8)}](${
        commit.url
      }) ${commit.author.name.padEnd(5)} ${dayjs(commit.timestamp).format(
        'YYYY-MM-DD HH:mm:ss',
      )} \n${commit.title}`;
    })
    .join('\n');

  return {
    tag: 'div',
    text: {
      tag: 'lark_md',
      content: `提交内容：\n ${text}`,
    },
  };
}

/**
 * create git push message
 * @param body PushEventJSON gitlab push event Payload
 * @returns any
 */
export function createPushMessage(body: PushEventJSON) {
  const {
    user_name,
    project: { name, git_http_url },
    ref,
    commits,
  } = body;

  const commitBlock = createCommitBlock(commits);
  return {
    msg_type: MessageTypeEnum.INTERACTIVE,
    card: {
      config: {
        wide_screen_mode: true,
      },
      elements: [
        {
          tag: 'markdown',
          content: `操作人：${user_name}\n操作时间：${dayjs(new Date()).format(
            'YYYY-MM-DD HH:mm:ss',
          )}\n`,
        },
        commitBlock,
        {
          tag: 'action',
          actions: [
            {
              tag: 'button',
              text: {
                tag: 'plain_text',
                content: '前往GitLab',
              },
              type: 'primary',
              multi_url: {
                url: git_http_url,
                android_url: '',
                ios_url: '',
                pc_url: '',
              },
            },
          ],
        },
      ],
      header: {
        template: 'blue',
        title: {
          content: `${user_name} 向${name} 的 ${ref} 推送了 ${commits.length} 个提交`,
          tag: 'plain_text',
        },
      },
    },
  };
}
