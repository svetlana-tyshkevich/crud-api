import { ServerResponse, IncomingMessage } from 'http';
import { db } from '../db';

const getByIdResponse = (
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
  id: string | undefined,
) => {
  const user = db.find((item) => item.id === id);
  if (!user) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end("This user doesn't exist");
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  }
};

export { getByIdResponse };
