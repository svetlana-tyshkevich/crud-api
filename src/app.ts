import * as http from 'node:http';
import { requestListener } from './routing';

const port = process.env['PORT'] || 3000;

const server = http.createServer((req, res) => requestListener(req, res));
server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

export { server };
