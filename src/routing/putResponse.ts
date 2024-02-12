import { ServerResponse, IncomingMessage } from 'http';
import { db } from '../db.js';
import { checkUserModel } from '../validation';

const putResponse = (
  res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  },
  id: string | undefined,
  requestBody: { username: string; age: number; hobbies: string[] },
) => {
  const { username, age, hobbies } = requestBody;

  const userIndex = db.findIndex((item) => item.id === id);
  const currentUser = db[userIndex];
  if (currentUser) {
    if (checkUserModel(requestBody, res)) {
      currentUser.username = username;
      currentUser.age = age;
      currentUser.hobbies = hobbies;

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(db[userIndex]));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end("This user doesn't exist");
  }
};

export { putResponse };
