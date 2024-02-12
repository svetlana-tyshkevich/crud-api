import { ServerResponse, IncomingMessage } from 'http';
import { validate as validateUUID } from 'uuid';

const checkPath = (
  path: string | string[],
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
) => {
  if (path[1] !== 'user' || path.length > 3) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end("This page doesn't exist");
    return false;
  }
  if (path[2] && !validateUUID(path[2])) {
    res.writeHead(400, { 'Content-Type': 'text/html' });
    res.end("This user's ID is invalid");
    return false;
  }

  return true;
};

const checkUserModel = (
  requestBody: { username: string; age: number; hobbies: string[] },
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
) => {
  const { username, age, hobbies } = requestBody;
  if (!username || !age || !hobbies) {
    res.writeHead(400, { 'Content-Type': 'text/html' });
    res.end("User's info is not complete");

    return false;
  }
  if (
    typeof username !== 'string' ||
    typeof age !== 'number' ||
    !Array.isArray(hobbies) ||
    !hobbies.every((item) => typeof item === 'string')
  ) {
    res.writeHead(400, { 'Content-Type': 'text/html' });
    res.end("User's info has invalid format");

    return false;
  }
  return true;
};

export { checkPath, checkUserModel };
