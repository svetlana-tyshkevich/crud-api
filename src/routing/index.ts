import { IncomingMessage, ServerResponse } from 'http';
import { getResponse } from './getResponse.js';

const requestListener = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
) => {
  let jsonString = '';
  req.on('data', (data: string) => {
    jsonString += data;
  });

  const urlString = req.url;
  const pathParts = urlString ? urlString.split('/') : [];

  console.log(pathParts);
  const { method } = req;
  switch (method) {
    case 'GET':
      getResponse(res);
      break;
  }
};

export { requestListener };
