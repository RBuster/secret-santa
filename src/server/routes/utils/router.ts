import fs from 'fs';
import { Request, Response } from 'express';
import path from 'path';

/**
 * Serves index page.
 *
 * @param _request - Express request.
 * @param response - Express response.
 */
export function serveIndex(_request: Request, response: Response): void {
  response.setHeader('Content-Type', 'text/html');
  fs.createReadStream(path.resolve(__dirname, '..', '..', '..', 'client', 'index.html')).pipe(
    response
  );
}
