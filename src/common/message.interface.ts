export enum MessageTypeEnum {
  TEXT = 'text',
  POST = 'post',
  IMAGE = 'image',
  SHARE_CHAT = 'share_chat',
  INTERACTIVE = 'interactive',
}

// export type MessageType = `${MessageTypeEnum}`;
export type MessageType = MessageTypeEnum[keyof MessageTypeEnum];

export interface TextMessage {
  msg_type: MessageType;
  content: {
    text: string;
  };
}
