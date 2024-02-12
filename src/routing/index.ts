import { IncomingMessage, ServerResponse } from 'http';
import { getResponse } from './getResponse.js';
import { postResponse } from './postResponse';
import { getByIdResponse } from './getByIdResponse';
import { putResponse } from './putResponse';
import { deleteResponse } from './deleteResponse';
import { checkPath } from '../validation';

const requestListener = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
) => {
  let jsonString = '';
  req.on('data', (data: string) => {
    jsonString += data;
  });

  const { url, method } = req;
  const pathParts = url ? url.split('/') : [];
  const id = pathParts[2];

  if (checkPath(pathParts, res)) {
    try {
      switch (method) {
        case 'GET':
          if (!id) getResponse(res);
          else getByIdResponse(res, id);
          break;

        case 'POST':
          if (!id)
            req.on('end', () => postResponse(res, JSON.parse(jsonString)));
          break;

        case 'PUT':
          if (id)
            req.on('end', () => putResponse(res, id, JSON.parse(jsonString)));
          break;

        case 'DELETE':
          if (id) req.on('end', () => deleteResponse(res, id));
          break;

        default:
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end("This Page doesn't exist!");
          break;
      }
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end('Sorry, server is not available!');
    }
  }
};

export { requestListener };
