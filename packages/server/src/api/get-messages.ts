import { RequestHandler } from "express-serve-static-core";
import { MessageItem } from "logger";
import { setAuth } from "../middleware";
import { env } from "../env";
interface GetMessagesData {
  append: MessageItem[];
  prefix: MessageItem[];
}
export const getMessages: RequestHandler<{}, GetMessagesData> = (req, res) => {
  const after = +(req.query.after as string) || 0;
  const prefix = +(req.query.prefix as string) || 0;
  const data = req.logger.getMessage(after, prefix);
  res.status(200).json({ ...data });
};
export const getMessagesRoute = "/messages";

export const fetchMessages = (after: string = "", prefix: string = "") => {
  return fetch(
    `${env.EXPRESS_API}${getMessagesRoute}?after=${after}&prefix=${prefix}`,
    {
      headers: setAuth(),
    }
  ).then((res) => res.json() as Promise<GetMessagesData>);
};
