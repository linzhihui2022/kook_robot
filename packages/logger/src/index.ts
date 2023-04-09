import { User } from "kaiheila-bot-root/dist/types/common";
import { ButtonEventMessage, TextMessage } from "kbotify";
export interface LoggerItem {
  user: User;
  channelId: string;
  guildId?: string;
  msgId: string;
  msgTimestamp: number;
  id: number;
  content: string;
}
export interface MessageItem extends LoggerItem {
  channelName?: string;
}
export interface EventItem extends LoggerItem {
  targetMsgId: string;
}

export class Logger {
  messageCache: MessageItem[] = [];
  eventCache: EventItem[] = [];
  constructor() {}

  pushMessage(msg: TextMessage) {
    const {
      author,
      channelName,
      channelId,
      guildId,
      content,
      msgId,
      msgTimestamp,
    } = msg;
    this.messageCache.unshift({
      user: author,
      channelName,
      channelId,
      guildId,
      content,
      msgId,
      msgTimestamp,
      id: new Date().getTime(),
    });
  }
  pushEvent(msg: ButtonEventMessage) {
    const {
      msgId,
      msgTimestamp,
      guildId,
      channelId,
      targetMsgId,
      content,
      user,
    } = msg;
    this.eventCache.unshift({
      msgId,
      msgTimestamp,
      guildId,
      channelId,
      targetMsgId,
      content,
      user,
      id: new Date().getTime(),
    });
  }

  getMessage(after: number, prefix?: number) {
    const prefixIndex = this.messageCache.findIndex((i) => i.id === prefix);
    const start = this.messageCache.findIndex((i) => i.id === after) + 1;
    return {
      append: this.messageCache.slice(start, start + 2),
      prefix: prefixIndex > -1 ? this.messageCache.slice(0, prefixIndex) : [],
    };
  }

  getEvent(after: number, prefix?: number) {
    const prefixIndex = this.eventCache.findIndex((i) => i.id === prefix);
    const start = this.eventCache.findIndex((i) => i.id === after) + 1;
    return {
      append: this.eventCache.slice(start, start + 2),
      prefix: prefixIndex > -1 ? this.eventCache.slice(0, prefixIndex) : [],
    };
  }
}
