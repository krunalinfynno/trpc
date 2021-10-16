/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  NodeHTTPCreateContextFnOptions,
  nodeHTTPRequestHandler,
} from '@trpc/server/adapters/node-http';
import * as url from 'url';
import { IncomingMessage, ServerResponse } from 'http';
import { createContext } from '../context';
import { appRouter } from '../routers/_app';

export type CreateHTTPContextOptions = NodeHTTPCreateContextFnOptions<
  IncomingMessage,
  ServerResponse
>;

export default async function trpcHandler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const parts = url.parse(req.url!);

  const path = parts.pathname!.substr(1);

  await nodeHTTPRequestHandler({
    router: appRouter,
    req,
    res,
    path,
    createContext,
  });
}
