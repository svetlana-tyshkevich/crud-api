import { v4 as uuidv4 } from 'uuid';
import { ServerResponse, IncomingMessage } from 'http';
import { db } from '../db';

const postResponse = (
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
  requestBody: { username: string; age: number; hobbies: string[] },
) => {
  const { username, age, hobbies } = requestBody;
  const id = uuidv4();
  if (username && age && hobbies) {
    const newPerson = { id, username, age, hobbies };
    db.push(newPerson);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newPerson));
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end('User Data is invalid');
  }
};

export { postResponse };
