import { RequestHandler } from "express-serve-static-core";
import { EventItem } from "logger";
import { setAuth } from "../middleware";
import { env } from "../env";

export interface GetEventsData {
  append: EventItem[];
  prefix: EventItem[];
}

export const getEvents: RequestHandler<{}, GetEventsData> = (req, res) => {
  const after = +(req.query.after as string) || 0;
  const prefix = +(req.query.prefix as string) || 0;
  const data = req.logger.getEvent(after, prefix);
  res.status(200).json({ ...data });
};

export const getEventsRoute = "/events";

export const fetchEvents = (after: string = "", prefix: string = "") => {
  return fetch(
    `${env.EXPRESS_API}${getEventsRoute}?after=${after}&prefix=${prefix}`,
    {
      headers: setAuth(),
    }
  ).then((res) => res.json() as Promise<GetEventsData>);
};
