const http = require('http');
const Tailor = require('node-tailor');

const tailor = new Tailor({});

// Layout service
http
  .createServer((req, res) => {
    if (req.url === '/') {
      req.url = '/index';
    }

    tailor.requestHandler(req, res);
  })
  .listen(8080, () => {
    console.log('Layout Server listening on port 8080');
  });

// Fragment server
http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end(`
      <nav>
        <menu><a href="/">Home</a></menu>
        <menu><a href="/characters">Characters</a></menu>
      </nav>
    `);
  })
  .listen(8081, () => {
    console.log('Fragment Server listening on port 8081');
  });
