import { User } from "kaiheila-bot-root/dist/types/common";
import { ButtonEventMessage, TextMessage } from "kbotify";
export interface MessageItem {
  author: User;
  channelName?: string;
  channelId: string;
  guildId?: string;
  content: string;
  msgId: string;
  msgTimestamp: number;
  id: number;
}
export interface EventItem {
  msgId: string;
  msgTimestamp: number;
  guildId?: string;
  channelId: string;
  targetMsgId: string;
  content: string;
  userId: string;
  user: User;
  id: number;
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
    this.messageCache.push({
      author,
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
      userId,
      user,
    } = msg;
    this.eventCache.push({
      msgId,
      msgTimestamp,
      guildId,
      channelId,
      targetMsgId,
      content,
      userId,
      user,
      id: new Date().getTime(),
    });
  }

  getMessage(after: number) {
    const start = this.messageCache.findIndex((i) => i.id === after) + 1;
    return this.messageCache.slice(start, start + 10);
  }

  getEvent(after: number) {
    const start = this.eventCache.findIndex((i) => i.id === after) + 1;
    return this.eventCache.slice(start, start + 10);
  }
}
