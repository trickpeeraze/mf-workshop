# Micro Frontends Workshop

The following guideline is for creating a simple Micro-Frontend project.

# Install and Setup

Step 1: initial project

```sh
# create your project’s folder
npm init -y
npm install node-tailor
```

```sh
# Project structure
.
├── ...
├── project_dir               # Server directory
│   ├── package.json          
│   ├── package-lock.json  
└── ...     
```

Step 2: create new `server.js` file

```js
const http = require('http');
const Tailor = require('node-tailor');

const tailor = new Tailor({});

http
  .createServer(tailor.requestHandler)
  .listen(8080);
```

```sh
# Project structure
.
├── ...
├── project_dir               # Server directory
│   ├── package.json          
│   ├── package-lock.json    
|   ├── server.js             # Server file
└── ...     
```

# Start composing

Step 3: create new `/templates/index.html` file

```html
<!DOCTYPE html>
<html>
  <head>
    <style></style>
  </head>
  <body>
    <aside>Hello</aside>
    <main>main</main>
  </body>
</html>
```

```sh
# Project structure
.
├── ...
├── project_dir               # Server directory
│   ├── package.json          
│   ├── package-lock.json    
|   ├── server.js             # Server file
│   ├── templates             # Templates directory
│   |   ├── index.html        
└── ...     
```

Step 4: replace text with `<fragment>` tag at `/templates/index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <style></style>
  </head>
  <body>
    <aside>
      <!-- replace with fragment tag -->
      <fragment src="https://www.google.com/"></fragment>
    </aside>
    <main>
      <!-- replace with fragment tag -->
      <fragment src="https://www.lipsum.com/"></fragment>
    </main>
  </body>
</html>
```

Step 5: add new `#layout-wrapper` style to `/templates/index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      /* add layout-wrapper class */
      #layout-wrapper {
        display: grid;
        grid-template-columns: 2fr 10fr;
        gap: 8px;
      }
    </style>
  </head>
  <body>
    <!-- add id="layout-wrapper" -->
    <div id="layout-wrapper">
      <aside>
        <fragment src="https://www.google.com/"></fragment>
      </aside>
      <main>
        <fragment src="https://www.lipsum.com/"></fragment>
      </main>
    </div>
  </body>
</html>
```

Step 6: add new sidebar menu server at port `8081` to `server.js`

```js
const http = require('http');
const Tailor = require('node-tailor');

const tailor = new Tailor({});

http.createServer(tailor.requestHandler).listen(8080);

// add new sidebar menu server at port 8081
http.createServer((_, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })

  res.end(`
    <nav>
      <menu><a href="/index">Home</a></menu>
      <menu><a href="/character">Characters</a></menu>
    </nav>
  `);
}).listen(8081);
```

Step 7: update URL on `<aside>`

```html
<!DOCTYPE html>
<html>
  <head>
    <style></style>
  </head>
  <body>
    <aside>
      <!-- update URL -->
      <fragment src="http://localhost:8081"></fragment>
    </aside>
    <main>
      <fragment src="https://www.lipsum.com/"></fragment>
    </main>
  </body>
</html>
```
# Routing

Step 8: create a new template `/templates/characters.html` by duplicate `/templates/index.html` file

```html
<html>
  <head>
    <style></style>
  </head>
  <body>
    <aside>
      <fragment src="http://localhost:8081"></fragment>
    </aside>
    <main>
      <fragment src="https://www.blognone.com/"></fragment>
    </main>
  </body>
</html>
```

```sh
# Project structure
.
├── ...
├── project_dir               # Server directory
│   ├── package.json          
│   ├── package-lock.json    
|   ├── server.js             # Server file
│   ├── templates             # Templates directory
│   |   ├── index.html        
│   |   ├── characters.html   
└── ...     
```

Step 9: clone a new fragment

```sh
git clone https://github.com/trickpeeraze/line-town-characters.git
npm i
npm run serve
```

```sh
# Project structure
.
├── ...
├── project_dir               # Server directory
│   ├── ...          
└── line-town-characters      # Fragment directory
│   ├── ... 
└── ...             
```

Step 10: try integration using a new fragment at `/templates/characters.html`

```html
<html>
  <head>
    <style></style>
  </head>
  <body>
    <aside>
      <fragment src="http://localhost:8081"></fragment>
    </aside>
    <main>
      <!-- update URL -->
      <fragment src="http://localhost:<PORT>/"></fragment>
    </main>
  </body>
</html>
```

Step 11: change fragment base path at `vue.config.js`

```js
{
  publicPath: 'http://localhost:<PORT>',
}

// if localhost doesn’t work use 127.0.0.1 instead.
```

Step: 12: update routes at `/router/index.js`

```js
const routes = [
  {
    // update path from '/' to '/characters'
    path: '/characters',
    name: 'sally',
    component: SallyView,
  },
  {
    // update path from '/brown' to '/characters/brown'
    path: '/characters/brown',
    name: 'brown',
    component() {
      return import(/* webpackChunkName: "brown" */ '../views/BrownView.vue');
    },
  },
];
```
