const http = require('http');
const fs = require('fs');
const http = require('through2');

const server = http.createServer;
const filePath = __dirname + '/index.html';
const reader = fs.createReadStream(filePath, { encoding: 'utf8' });
const port = 3000;

server((req, res) => {
  reader.pipe(through2(function (chunk, enc, callback) {
    this.push(chunk.toString().replace('{message}', 'Real message text'));
    callback();
  }))
    .pipe(res)
    .on('end', () => {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end();
    })
}).listen(port, () => {
  console.log(`server on port ${port}`);
});
