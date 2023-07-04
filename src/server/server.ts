import express from 'express';
import http from 'http';
import { AddressInfo } from 'net';
import path from 'path';
import program from './utils/args';
import { serveIndex } from './routes/utils/router';

const app = express();
const PORT = 3000;

// eslint-disable-next-line
// @ts-ignore - this is a temporary fix for the express type error
app.get('/api/hello', (req, res) => {
  res.send('Hello World?!');
});

async function init() {
  //------------------------------------------------------------------------------------------------------------------
  // Routing
  //------------------------------------------------------------------------------------------------------------------

  // Setup static serving
  app.use(express.static(path.resolve(__dirname, '..', 'client')));

  // Set up our application routes

  // Serve index.html for any html requests, but 404 everything else.
  app.get('*', (_request, response) => {
    response.format({
      html: serveIndex,
      json: (_req, resp) => {
        resp.status(404).end();
      }
    });
  });

  //------------------------------------------------------------------------------------------------------------------
  // Server
  //------------------------------------------------------------------------------------------------------------------
  const server = http.createServer(app);

  server.listen(PORT, () => {
    const { address, port } = server.address() as AddressInfo;
    const host = address === '::' ? 'localhost' : address;
    let actualPort = port;

    if (program.args.includes('--dev')) {
      console.warn('Should launch vite...');
      actualPort += 1;

      // Start Vite Dev Server
      (async () => {
        const { createServer } = await import('vite');
        const viteServer = await createServer();
        await viteServer.listen();
      })();
    }

    console.log(`Server listening on http://${host}:${actualPort}`);
  });
}

init();
