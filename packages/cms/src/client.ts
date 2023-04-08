import { ClientError, GraphQLClient } from "graphql-request";
import { getSdk, Sdk } from "./generated";
import { env, url } from "./env";
import type { Response } from "graphql-request/dist/types";

const requestHeaders = (headers = new Headers()) => {
  headers.set("Authorization", `Bearer ${env.CONTENTFUL_TOKEN}`);
  return headers;
};
export const errorHandle = (
  response: Error | Response<unknown>,
  handle?: {
    error?: (e: Error) => void;
    clientError?: (e: ClientError) => void;
  }
) => {
  if (response instanceof Error) {
    if (response instanceof ClientError) {
      handle?.clientError?.(response);
    } else {
      handle?.error?.(response);
    }
  }
};

export const createClientBase = (
  clientUrl: string,
  getHeaders?: () => Headers,
  handleError?: {
    error?: (e: Error) => void;
    clientError?: (e: ClientError) => void;
  }
): Sdk => {
  const headers = getHeaders?.() || new Headers();
  headers.set("Content-Type", "application/json");
  return getSdk(
    new GraphQLClient(clientUrl, {
      headers,
      responseMiddleware: (res) => errorHandle(res, handleError),
    })
  );
};

export const contentful = () => {
  const client = createClientBase(url, requestHeaders, {
    error: console.error,
    clientError: (e) => console.log(e.request.variables),
  });
  return {
    fetchCard: (slug: string) =>
      client
        .cards({
          where: { slug },
          limit: 1,
          skip: 0,
        })
        .then((res) => res.cardCollection?.items.at(0)),
  };
};
