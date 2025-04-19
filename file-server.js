const fs = require('fs');
const path = require('path');

const { createServer } = require('node:http');
const hostname = '127.0.0.1';

const port = 3000;
const staticAssets = path.join(__dirname, 'assets');
const server = createServer((req, res) => {
  console.log(`Request for ${req.url} received.`);
  const url = req.url || '/';
  const ext = path.extname(url);
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
  };
  const contentType = mimeTypes[ext] || 'text/plain';
  let filePath = path.join(staticAssets, url);
  res.setHeader('Content-Type', contentType);
  switch (url) {
    case '/':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      break;
    case '/scripts.js':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/javascript');
      break;
    case '/styles.css':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/css');
      break;
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('404 Not Found');
      return;
  }
  // Serve the index.html file
  if (url === '/') {
    filePath = path.join(staticAssets, 'index.html');
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Error loading index.html');
      return;
    }

    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
