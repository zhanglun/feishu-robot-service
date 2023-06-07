import * as dayjs from 'dayjs';

export enum HookResourceEnum {
  INSTALLATION = 'installation',
  EVENT_ALERT = 'event_alert',
  ISSUE = 'issue',
  METRIC_ALERT = 'metric_alert',
  ERROR = 'error',
  COMMENT = 'comment',
}

export type HookResourceType = `${HookResourceEnum}`;

export enum IssueActionEnum {
  CREATED = 'created',
  RESOLVED = 'resolved',
  ASSIGNED = 'assigned',
  IGNORED = 'ignored',
}

export type IssueActionType = `${IssueActionEnum}`;

export interface SentryJSON {
  action: `${IssueActionEnum}`;
  actor: Actor;
  data: Data;
  installation: Installation;
}

export interface Actor {
  id: string;
  name: string;
  type: string;
}

export interface Data {
  comment?: string;
  project_slug?: string;
  comment_id?: number;
  issue_id?: number;
  timestamp?: Date;
  issue?: Issue;
  error?: Error;
  event?: Event;

  triggered_rule?: string;
}

export interface Issue {
  annotations: any[];
  assignedTo: null;
  count: string;
  culprit: string;
  firstSeen: Date;
  hasSeen: boolean;
  id: string;
  isBookmarked: boolean;
  isPublic: boolean;
  isSubscribed: boolean;
  lastSeen: Date;
  level: string;
  logger: null;
  metadata: Metadata;
  numComments: number;
  permalink: null;
  platform: string;
  project: Project;
  shareId: null;
  shortId: string;
  status: string;
  statusDetails: any;
  subscriptionDetails: null;
  title: string;
  type: string;
  userCount: number;
}

export interface Error {
  event_id: string;
  project: number;
  release: any;
  dist: any;
  platform: string;
  message: string;
  datetime: string;
  tags: string[][];
  _metrics: Metrics;
  _ref: number;
  _ref_version: number;
  contexts: Contexts;
  culprit: string;
  environment: string;
  errors: Error2[];
  exception: Exception;
  extra: Extra;
  fingerprint: string[];
  grouping_config: GroupingConfig;
  hashes: string[];
  key_id: string;
  level: string;
  location: string;
  logger: string;
  metadata: Metadata;
  nodestore_insert: number;
  received: number;
  request: Request;
  sdk: Sdk;
  timestamp: number;
  title: string;
  type: string;
  user: User;
  version: string;
  url: string;
  web_url: string;
  issue_url: string;
  issue_id: string;
}

export interface Metrics {
  'bytes.ingested.event': number;
  'bytes.stored.event': number;
  'flag.processing.error': boolean;
}

export interface Error2 {
  type: string;
  value: string;
  url: string;
}

export interface Extra {
  arguments: Argument[];
}

export interface Argument {
  currentTarget: string;
  isTrusted: boolean;
  target: string;
  type: string;
}

export interface Event {
  _ref: number;
  _ref_version: number;
  contexts: Contexts;
  culprit: string;
  datetime: string;
  dist: any;
  event_id: string;
  exception: Exception;
  fingerprint: string[];
  grouping_config: GroupingConfig;
  hashes: string[];
  issue_url: string;
  issue_id: string;
  key_id: string;
  level: string;
  location: string;
  logger: string;
  message: string;
  metadata: Metadata;
  platform: string;
  project: number;
  received: number;
  release: any;
  request: Request;
  sdk: Sdk;
  tags: string[][];
  time_spent: any;
  timestamp: number;
  title: string;
  type: string;
  url: string;
  user: User;
  version: string;
  web_url: string;
}

export interface Contexts {
  browser: Browser;
  os: Os;
}

export interface Browser {
  name: string;
  type: string;
  version: string;
}

export interface Os {
  name: string;
  type: string;
  version: string;
}

export interface Exception {
  values: Value[];
}

export interface Value {
  mechanism: Mechanism;
  stacktrace: Stacktrace;
  type: string;
  value: string;
}

export interface Mechanism {
  data: Data2;
  description: any;
  handled: boolean;
  help_link: any;
  meta: any;
  synthetic: any;
  type: string;
}

export interface Data2 {
  message: string;
  mode: string;
  name: string;
}

export interface Stacktrace {
  frames: Frame[];
}

export interface Frame {
  abs_path: string;
  colno: number;
  context_line: string;
  data: Data3;
  errors: any;
  filename: string;
  function: any;
  image_addr: any;
  in_app: boolean;
  instruction_addr: any;
  lineno: number;
  module: string;
  package: any;
  platform: any;
  post_context: string[];
  pre_context: string[];
  raw_function: any;
  symbol: any;
  symbol_addr: any;
  trust: any;
  vars: any;
}

export interface Data3 {
  orig_in_app: number;
}

export interface GroupingConfig {
  enhancements: string;
  id: string;
}

export interface Sdk {
  integrations: string[];
  name: string;
  packages: Package[];
  version: string;
}

export interface Package {
  name: string;
  version: string;
}

export interface User {
  ip_address: string;
}

export interface Metadata {
  filename: string;
  type: string;
  value: string;
}

export interface Project {
  id: string;
  name: string;
  platform: string;
  slug: string;
}

export interface Installation {
  uuid: string;
}

// export function createSentryIssueAlertMessage(body: SentryJSON) {
//   const { event } = body.data;
//   const {
//     title,
//     environment,
//     project,
//     project_name,
//     culprit,
//     message,
//     url,
//     level,
//   } = event;
//   const LEVEL = level.toUpperCase();
//   const color = {
//     ERROR: 'red',
//     WARNING: 'yellow',
//     INFO: 'blue',
//   }[LEVEL];
//   const env = environment || 'UNKNOWN';
//   const timestamp = dayjs(event.timestamp).format('YYYY-MM-DD HH:mm:ss');
//   const issue_id = body['id'];

//   return {
//     msg_type: 'interactive',
//     card: {
//       config: {
//         wide_screen_mode: true,
//         enable_forward: true,
//       },
//       header: {
//         template: color,
//         title: {
//           content: `【网站服务${level}】 ${project} 项目在 ${env}环境出现异常`,
//           tag: 'plain_text',
//         },
//       },
//       elements: [
//         {
//           fields: [
//             {
//               is_short: true,
//               text: {
//                 content: `**🕐 时间：**\n${dayjs(timestamp).format(
//                   'YYYY-MM-DD HH:mm:ss',
//                 )}`,
//                 tag: 'lark_md',
//               },
//             },
//             {
//               is_short: true,
//               text: {
//                 content: `**📋 项目：**\n${project_name}`,
//                 tag: 'lark_md',
//               },
//             },
//             {
//               is_short: false,
//               text: {
//                 content: '',
//                 tag: 'lark_md',
//               },
//             },
//             {
//               is_short: true,
//               text: {
//                 content: `**📍 部署环境：**\n${env}`,
//                 tag: 'lark_md',
//               },
//             },
//             {
//               is_short: true,
//               text: {
//                 content: `**🔢 事件 ID：**\n${issue_id}`,
//                 tag: 'lark_md',
//               },
//             },
//             {
//               is_short: false,
//               text: {
//                 content: '',
//                 tag: 'lark_md',
//               },
//             },
//           ],
//           tag: 'div',
//         },
//         {
//           tag: 'div',
//           text: {
//             content: `**${title}**\n${culprit}\n\n**Message: **\n${message}`,
//             tag: 'lark_md',
//           },
//         },
//         {
//           actions: [
//             {
//               tag: 'button',
//               text: {
//                 content: '开始处理',
//                 tag: 'plain_text',
//               },
//               type: 'primary',
//               url: url,
//               value: {
//                 key: 'value',
//               },
//             },
//           ],
//           tag: 'action',
//         },
//         {
//           tag: 'hr',
//         },
//         {
//           elements: [
//             {
//               content: `来自Sentry日志平台`,
//               tag: 'lark_md',
//             },
//           ],
//           tag: 'note',
//         },
//       ],
//     },
//   };
// }

const baseMessage = {
  msg_type: 'interactive',
  card: {
    config: {
      wide_screen_mode: true,
      enable_forward: true,
    },
  },
};

const getHeaderColor = (type: string | IssueActionEnum) => {
  return {
    ERROR: 'red',
    WARNING: 'yellow',
    INFO: 'blue',
    [IssueActionEnum.CREATED]: 'red',
    [IssueActionEnum.RESOLVED]: 'green',
  }[type];
};

function createField(content: string, is_short?: boolean) {
  return {
    is_short: is_short,
    text: {
      content: content,
      tag: 'lark_md',
    },
  };
}

export function createSentryIssueMessage(body: SentryJSON) {
  const { action, data, actor } = body;
  const { issue } = data;
  const { level, metadata, project } = issue;

  switch (action) {
    case IssueActionEnum.RESOLVED:
      return {
        ...baseMessage,
        card: {
          ...baseMessage.card,
          header: {
            template: getHeaderColor(IssueActionEnum.RESOLVED),
            title: {
              content: `${actor.name} 解决了${issue.shortId}#${issue.id}`,
              tag: 'lark_md',
            },
          },
          elements: [
            {
              tag: 'div',
              fields: [
                createField(
                  `**🕐 时间：**${dayjs(new Date()).format(
                    'YYYY-MM-DD HH:mm:ss',
                  )}`,
                  true,
                ),
                createField(
                  `**📋 项目：** [${project.name}](https://sentry.yiwise.com/organizations/yiwise/issues/${issue.id})`,
                  true,
                ),
                createField(''),
                createField(`**📍 问题等级：**${level}`, true),
                createField(''),
                createField(`**🚨 问题信息：**${metadata.value}\n`),
              ],
            },
            {
              tag: 'hr',
            },
            {
              elements: [
                {
                  content: `来自Sentry日志平台`,
                  tag: 'lark_md',
                },
              ],
              tag: 'note',
            },
          ],
        },
      };
      break;
    default:
      break;
  }
}

export function createSentryErrorMessage(body: SentryJSON) {
  const { data, actor } = body;
  const { error } = data;
  const {
    level,
    url,
    web_url,
    location,
    datetime,
    title,
    culprit,
    environment,
    metadata,
  } = error;
  const LEVEL = level.toUpperCase();
  const project_name = url.match(/projects\/(.*)\/events?/)[1] || 'UNKNOWN';

  return {
    msg_type: 'interactive',
    card: {
      config: {
        wide_screen_mode: true,
        enable_forward: true,
      },
      header: {
        template: getHeaderColor(LEVEL),
        title: {
          content: `【网站服务 ${LEVEL}】 ${project_name} 项目在 ${environment} 环境出现异常`,
          tag: 'plain_text',
        },
      },
      elements: [
        {
          tag: 'div',
          fields: [
            createField(
              `**🕐 时间：**${dayjs(datetime).format('YYYY-MM-DD HH:mm:ss')}`,
              true,
            ),
            createField(`**📋 项目：** [${project_name}](${web_url})`, true),
            createField(''),
            createField(`**📍 部署环境：**${environment}`, true),
            createField(''),
            createField(
              `**🚨 错误信息：**\n**${metadata.type}**\n${metadata.value}\n${metadata.filename} in ${culprit}`,
            ),
          ],
        },
        {
          actions: [
            {
              tag: 'button',
              text: {
                content: '开始处理',
                tag: 'plain_text',
              },
              type: 'primary',
              url: web_url,
              value: {
                key: 'value',
              },
            },
          ],
          tag: 'action',
        },
        {
          tag: 'hr',
        },
        {
          elements: [
            {
              content: `来自Sentry日志平台`,
              tag: 'lark_md',
            },
          ],
          tag: 'note',
        },
      ],
    },
  };
}

export function createSentryEventAlertMessage(body: SentryJSON) {
  const { data } = body;
  const { event, triggered_rule } = data;
  const { url, web_url, location, datetime, title, culprit, type, metadata } =
    event;
  const LEVEL = type.toUpperCase();
  const project_name = url.match(/projects\/(.*)\/events?/)[1] || 'UNKNOWN';

  return {
    msg_type: 'interactive',
    card: {
      config: {
        wide_screen_mode: true,
        enable_forward: true,
      },
      header: {
        template: getHeaderColor(LEVEL),
        title: {
          content: `🚨【Alert】 ${project_name} 项目发出了告警 ${triggered_rule}`,
          tag: 'plain_text',
        },
      },
      elements: [
        {
          tag: 'div',
          fields: [
            createField(
              `**🕐 时间：**${dayjs(datetime).format('YYYY-MM-DD HH:mm:ss')}`,
              true,
            ),
            createField(`**📋 项目：** [${project_name}](${web_url})`, true),
            createField(''),
            // createField(`**📍 部署环境：**${environment}`, true),
            // createField(''),
            createField(
              `**🚨 错误信息：**\n**${metadata.type}**\n${metadata.value}\n${metadata.filename} in ${culprit}`,
            ),
          ],
        },
        {
          actions: [
            {
              tag: 'button',
              text: {
                content: '开始处理',
                tag: 'plain_text',
              },
              type: 'primary',
              url: web_url,
              value: {
                key: 'value',
              },
            },
          ],
          tag: 'action',
        },
        {
          tag: 'hr',
        },
        {
          elements: [
            {
              content: `来自Sentry日志平台`,
              tag: 'lark_md',
            },
          ],
          tag: 'note',
        },
      ],
    },
  };
}

export function createSentryMetricAlertMessage(body: SentryJSON) {}
