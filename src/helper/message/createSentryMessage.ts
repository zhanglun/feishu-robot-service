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
export interface SentryEventBody {
  id: string;
  extra: {
    results: Array<number>;
    session: {
      foo: string;
    };
    unauthorized: boolean;
    url: string;
    emptyList: Array<unknown>;
    emptyMap: any;
    length: number;
  };
  title: string;
  stacktrace: {
    frames: Array<
      | {
          instruction_addr: unknown;
          addr_mode: unknown;
          symbol: unknown;
          module: string;
          context_line: string;
          data: unknown;
          errors: unknown;
          raw_function: unknown;
          symbol_addr: unknown;
          filename: string;
          abs_path: string;
          post_context: Array<string>;
          colno: unknown;
          platform: unknown;
          function: string;
          lineno: number;
          in_app: boolean;
          vars: {
            "'data'": {
              "'message'": string;
              "'sentry.interfaces.Message'": {
                "'message'": string;
                "'params'": Array<unknown>;
              };
            };
            "'event_id'": string;
            "'event_type'": string;
            "'kwargs'": {
              "'level'": number;
              "'message'": string;
            };
            "'stack'": boolean;
            "'culprit'": unknown;
            "'extra'": {
              "'go_deeper'": Array<unknown>;
              "'loadavg'": Array<number>;
              "'user'": string;
            };
            "'public_key'": unknown;
            "'result'": {
              "'sentry.interfaces.Message'": {
                "'message'": string;
                "'params'": Array<unknown>;
              };
              "'message'": string;
            };
            "'time_spent'": unknown;
            "'v'": {
              "'message'": string;
              "'params'": Array<unknown>;
            };
            "'date'": string;
            "'k'": string;
            "'frames'": string;
            "'handler'": string;
            "'sel`": string;
            "'tags'": unknown;
          };
          trust: unknown;
          pre_context: Array<string>;
          image_addr: unknown;
          package: unknown;
          snapshot: unknown;
        }
      | {
          abs_path: string;
          lineno: number;
          post_context: Array<string>;
          symbol_addr: unknown;
          trust: unknown;
          snapshot: unknown;
          function: string;
          colno: unknown;
          errors: unknown;
          image_addr: unknown;
          module: string;
          raw_function: unknown;
          package: unknown;
          symbol: unknown;
          filename: string;
          context_line: string;
          in_app: boolean;
          vars: {
            "'data'": unknown;
            "'extra'": {
              "'go_deeper'": Array<unknown>;
              "'loadavg'": Array<number>;
              "'user'": string;
            };
            "'sel`": string;
            "'tags'": unknown;
            "'time_spent'": unknown;
            "'date'": unknown;
            "'event_type'": string;
            "'kwargs'": {
              "'level'": number;
              "'message'": string;
            };
            "'stack'": boolean;
          };
          data: unknown;
          instruction_addr: unknown;
          addr_mode: unknown;
          platform: unknown;
          pre_context: Array<string>;
        }
      | {
          in_app: boolean;
          colno: unknown;
          instruction_addr: unknown;
          symbol: unknown;
          symbol_addr: unknown;
          filename: string;
          lineno: number;
          vars: {
            "'message'": string;
            "'sel`": string;
            "'kwargs'": {
              "'extra'": {
                "'go_deeper'": Array<string>;
                "'loadavg'": Array<number>;
                "'user'": string;
              };
              "'level'": number;
              "'stack'": boolean;
              "'tags'": unknown;
              "'data'": unknown;
            };
          };
          image_addr: unknown;
          addr_mode: unknown;
          platform: unknown;
          trust: unknown;
          context_line: string;
          post_context: Array<string>;
          abs_path: string;
          pre_context: Array<string>;
          errors: unknown;
          raw_function: unknown;
          package: unknown;
          snapshot: unknown;
          function: string;
          module: string;
          data: unknown;
        }
      | {
          image_addr: unknown;
          instruction_addr: unknown;
          module: string;
          lineno: number;
          post_context: Array<string>;
          in_app: boolean;
          vars: {
            "'client'": string;
            "'data'": unknown;
            "'k'": string;
            "'options'": {
              "'data'": unknown;
              "'tags'": unknown;
            };
          };
          raw_function: unknown;
          addr_mode: unknown;
          package: unknown;
          symbol_addr: unknown;
          function: string;
          context_line: string;
          data: unknown;
          platform: unknown;
          trust: unknown;
          pre_context: Array<string>;
          errors: unknown;
          filename: string;
          abs_path: string;
          colno: unknown;
          symbol: unknown;
          snapshot: unknown;
        }
      | {
          abs_path: string;
          in_app: boolean;
          colno: unknown;
          package: unknown;
          symbol_addr: unknown;
          lineno: number;
          vars: {
            "'parser'": string;
            "'root'": string;
            "'args'": Array<string>;
            "'client'": string;
            "'dsn'": string;
            "'opts'": string;
          };
          raw_function: unknown;
          image_addr: unknown;
          addr_mode: unknown;
          platform: unknown;
          post_context: unknown;
          snapshot: unknown;
          function: string;
          filename: string;
          context_line: string;
          errors: unknown;
          module: string;
          pre_context: Array<string>;
          data: unknown;
          instruction_addr: unknown;
          symbol: unknown;
          trust: unknown;
        }
    >;
  };
  type: string;
  received: number;
  user: {
    geo: {
      country_code: string;
      city: string;
      region: string;
    };
    id: string;
    email: string;
    ip_address: string;
    username: string;
    name: string;
  };
  event_id: string;
  logentry: {
    formatted: string;
    message: unknown;
    params: unknown;
  };
  request: {
    data: {
      hello: string;
    };
    query_string: Array<unknown>;
    headers: Array<unknown>;
    env: {
      ENV: string;
    };
    url: string;
    cookies: Array<unknown>;
    inferred_content_type: string;
    fragment: unknown;
    method: string;
  };
  timestamp: number;
  metadata: {
    title: string;
  };
  nodestore_insert: number;
  version: string;
  environment: string;
  tags: Array<unknown>;
  fingerprint: Array<string>;
  location: unknown;
  modules: {
    'my.package': string;
  };
  platform: string;
  contexts: {
    browser: {
      type: string;
      name: string;
      version: string;
    };
    client_os: {
      name: string;
      version: string;
      type: string;
    };
  };
  hashes: Array<string>;
  culprit: string;
  level: string;
  logger: string;
}

export interface SentryJSON {
  logger: unknown;
  level: string;
  url: string;
  triggering_rules: Array<unknown>;
  id: string;
  project: string;
  project_name: string;
  project_slug: string;
  culprit: string;
  message: string;
  event: SentryEventBody;
}

export function createSentryMessage(body: SentryJSON) {
  const { event, project, project_name, culprit, message, url, level } = body;
  const { title, environment } = event;
  const LEVEL = level.toUpperCase();
  const color = {
    ERROR: 'red',
    WARNING: 'yellow',
    INFO: 'blue',
  }[LEVEL];
  const env = environment || 'UNKNOWN';
  const timestamp = dayjs(event.timestamp).format('YYYY-MM-DD HH:mm:ss');
  const issue_id = body['id'];

  return {
    msg_type: 'interactive',
    card: {
      config: {
        wide_screen_mode: true,
        enable_forward: true,
      },
      header: {
        template: color,
        title: {
          content: `【网站服务${level}】 ${project} 项目在 ${env}环境出现异常`,
          tag: 'plain_text',
        },
      },
      elements: [
        {
          fields: [
            {
              is_short: true,
              text: {
                content: `**🕐 时间：**\n${dayjs(timestamp).format(
                  'YYYY-MM-DD HH:mm:ss',
                )}`,
                tag: 'lark_md',
              },
            },
            {
              is_short: true,
              text: {
                content: `**📋 项目：**\n${project_name}`,
                tag: 'lark_md',
              },
            },
            {
              is_short: false,
              text: {
                content: '',
                tag: 'lark_md',
              },
            },
            {
              is_short: true,
              text: {
                content: `**📍 部署环境：**\n${env}`,
                tag: 'lark_md',
              },
            },
            {
              is_short: true,
              text: {
                content: `**🔢 事件 ID：**\n${issue_id}`,
                tag: 'lark_md',
              },
            },
            {
              is_short: false,
              text: {
                content: '',
                tag: 'lark_md',
              },
            },
          ],
          tag: 'div',
        },
        {
          tag: 'div',
          text: {
            content: `**${title}**\n${culprit}\n\n**Message: **\n${message}`,
            tag: 'lark_md',
          },
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
              url: url,
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
