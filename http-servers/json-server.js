const http = require('http');

const server = http.createServer;
const port = 3000;
const product = {
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [
    { color: 'blue' },
    { size: 'XL'}
  ]
};

server((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify(product));
}).listen(port, () => {
  console.log(`server on port ${port}`);
});
