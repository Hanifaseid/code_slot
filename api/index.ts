import type { IncomingMessage, ServerResponse } from 'node:http';
import { app } from '../apps/backend/src/app.js';

/**
 * Vercel Serverless Function entry point for CodeSlot Express API
 */
export default function handler(req: IncomingMessage, res: ServerResponse) {
  return (app as any)(req, res);
}
