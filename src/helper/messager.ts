import * as dayjs from 'dayjs';
import {
  Commit,
  MergeEventJSON,
  MergeEventObjectAttributes,
  MergeRequestActionEnum,
  PushEventJSON,
  NoteEventJSON,
  NoteEventObjectAttributes,
  NoteActionEnum,
  Issue,
  MergeRequest,
  Snippet,
} from 'src/webhooks/interfaces/gitlab.interface';
import { MessageTypeEnum } from 'src/common/message.interface';

/**
 * create commit block in feishu message
 * @param commits Commit[] commit data list
 * @returns any
 */

function createCommitBlock(commits: Commit[]) {
  const text = commits
    .reverse()
    .map((commit) => {
      return `[#${commit.id.slice(0, 8)}](${
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
      content: `**提交内容：**\n ${text}`,
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
      header: {
        template: 'blue',
        title: {
          content: `✨ ${user_name} 向 ${name} 的 ${ref} 推送了 ${commits.length} 个提交`,
          tag: 'plain_text',
        },
      },
      elements: [
        {
          tag: 'div',
          fields: [
            {
              is_short: true,
              text: {
                tag: 'lark_md',
                content: `**推送时间：**\n ${dayjs(new Date()).format(
                  'YYYY-MM-DD HH:mm:ss',
                )}`,
              },
            },
          ],
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
    },
  };
}

function createMergeInfoBlock(
  user_name: string,
  object_attributes: MergeEventObjectAttributes,
) {
  const {
    action,
    target_branch,
    source_branch,
    source,
    target,
    created_at,
    updated_at,
    iid,
    url,
  } = object_attributes;

  return {
    tag: 'div',
    fields: [
      {
        text: {
          tag: 'lark_md',
          content: `${user_name} ${MergeRequestActionEnum[action]} 了一个 Merge Request [!${iid}](${url})`,
        },
      },
      {
        is_short: false,
        text: {
          tag: 'lark_md',
          content: '',
        },
      },
      {
        is_short: true,
        text: {
          tag: 'lark_md',
          content: `**提交时间：**\n${dayjs(created_at).format(
            'YYYY-MM-DD HH:mm:ss',
          )}`,
        },
      },
      {
        is_short: true,
        text: {
          tag: 'lark_md',
          content: `**最后更新时间：**\n${dayjs(updated_at).format(
            'YYYY-MM-DD HH:mm:ss',
          )}`,
        },
      },
      {
        is_short: false,
        text: {
          tag: 'lark_md',
          content: '',
        },
      },
      {
        is_short: true,
        text: {
          tag: 'lark_md',
          content: `**Source Branch：**\n [${source.path_with_namespace}](${source.git_http_url})`,
        },
      },
      {
        is_short: true,
        text: {
          tag: 'lark_md',
          content: `**Target Branch：**\n [${target.path_with_namespace}](${target.git_http_url})`,
        },
      },
      {
        is_short: false,
        text: {
          tag: 'lark_md',
          content: '',
        },
      },
    ],
  };
}

export function createMergeMessage(body: MergeEventJSON) {
  const {
    user,
    project: { git_http_url },
    object_attributes,
  } = body;

  const user_name = user.name;
  const mergeInfoBlock = createMergeInfoBlock(user_name, object_attributes);

  return {
    msg_type: MessageTypeEnum.INTERACTIVE,
    card: {
      config: {
        wide_screen_mode: true,
      },
      header: {
        template: 'orange',
        title: {
          content: `🔀 ${user_name} ${
            MergeRequestActionEnum[object_attributes.action]
          } 了一个 Merge Request`,
          tag: 'plain_text',
        },
      },
      elements: [
        mergeInfoBlock,
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
            {
              tag: 'button',
              text: {
                tag: 'plain_text',
                content: '前往 MR 地址',
              },
              type: 'primary',
              multi_url: {
                url: object_attributes.url,
                android_url: '',
                ios_url: '',
                pc_url: '',
              },
            },
          ],
        },
      ],
    },
  };
}

function createNoteBlock(
  username: string,
  object_attributes: NoteEventObjectAttributes,
  note?: {
    commit?: Commit;
    issue?: Issue;
    merge_request?: MergeRequest;
    snippet?: Snippet;
  },
) {
  const { noteable_type, note: text, created_at } = object_attributes;
  let position = '';

  console.log('%c Line:263 🍊 noteable_type', 'color:#ea7e5c', noteable_type);

  if (noteable_type === NoteActionEnum.Commit) {
    position = `***${note.commit.message}***`;
  }

  if (noteable_type === NoteActionEnum.MergeRequest) {
    position = `***${note.merge_request.title}***`;
  }

  if (noteable_type === NoteActionEnum.Snippet) {
    position = `${note.snippet.content}`;
  }

  return {
    tag: 'div',
    fields: [
      {
        text: {
          tag: 'lark_md',
          content: `${username} 在 ${position} 评论说：\n **${text}**`,
        },
      },
      {
        is_short: false,
        text: {
          tag: 'lark_md',
          content: '',
        },
      },
      {
        is_short: true,
        text: {
          tag: 'lark_md',
          content: `**发布时间：**\n${dayjs(created_at).format(
            'YYYY-MM-DD HH:mm:ss',
          )}`,
        },
      },
    ],
  };
}

export function createNoteMessage(body: NoteEventJSON) {
  const {
    user,
    project: { name, git_http_url },
    object_attributes,
    commit,
    issue,
    snippet,
    merge_request,
  } = body;

  return {
    msg_type: MessageTypeEnum.INTERACTIVE,
    card: {
      config: {
        wide_screen_mode: true,
      },
      header: {
        template: 'purple',
        title: {
          content: `💡 ${user.name} 在 ${name} 中发表了一条评论 `,
          tag: 'plain_text',
        },
      },
      elements: [
        createNoteBlock(user.name, object_attributes, {
          commit,
          issue,
          snippet,
          merge_request,
        }),
        {
          tag: 'action',
          actions: [
            {
              tag: 'button',
              text: {
                tag: 'plain_text',
                content: '查看评论',
              },
              type: 'primary',
              multi_url: {
                url: object_attributes.url,
                android_url: '',
                ios_url: '',
                pc_url: '',
              },
            },
            {
              tag: 'button',
              text: {
                tag: 'plain_text',
                content: '前往 Gitlab 仓库',
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
    },
  };
}
