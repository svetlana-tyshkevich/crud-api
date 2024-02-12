import { IncomingMessage, ServerResponse } from 'http';
import { getResponse } from './getResponse.js';
import { postResponse } from './postResponse';
import { getByIdResponse } from './getByIdResponse';

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

  switch (method) {
    case 'GET':
      if (!id) getResponse(res);
      else getByIdResponse(res, id);
      break;

    case 'POST':
      if (!id) req.on('end', () => postResponse(res, JSON.parse(jsonString)));
      break;
  }
};

export { requestListener };
