import http from 'http';

const port = process.env['PORT'] || 3000;

const server = http.createServer((_req, res) => {
  try {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end("Server doesn't available");
  }
});
server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
