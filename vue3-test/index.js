const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log('hello,nodejs!');
    console.log('url : '+req.url);
    if(req.url === '/hello'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World');
    }else if(req.url === '/hi'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hi World');
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});