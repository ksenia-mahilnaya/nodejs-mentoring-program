const http = require('http');

const server = http.createServer;
const port = 3000;

server((req, res) => {
  res.writeHead(200);
  req.pipe(res);
}).listen(port, () => {
  console.log(`server on port ${port}`);
});