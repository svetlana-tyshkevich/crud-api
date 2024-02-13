import { ServerResponse, IncomingMessage } from 'http';
import { db } from '../db';

const deleteResponse = (
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
  id: string | undefined,
) => {
  throw new Error('im an error!');
  const userIndex = db.findIndex((item) => item.id === id);
  if (userIndex < 0) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end("This user doesn't exist");
  } else {
    db.splice(userIndex, 1);

    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.write('User is deleted');
    res.end();
  }
};

export { deleteResponse };
