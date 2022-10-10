## Node Router

###  Simple Router for Node.js for development.

This is a small library to create router and server fast in **Node.js**.
If you want a simple library to create a router and server in **Node.js** for testing things out this is the right library for you.
I would not recommend using this in production.

### Installation

```bash
npm install node-router
```

### Usage

```js
const httpServer = require('node-router');

// create a server with port 3000 and host
const server = new httpServer(3000, 'localhost');

// passing routes to the server and starting the server

server.start({
    routes: [
        { 
            // using path to match the route
            path: "GET /test",
            handler: (req, res) => {
                res.end("Hello From Test!")
            }
        },
        {
            // using regex to match the route
            path: "GET /api/v1/user/*",
            handler: (req, res) => {
                res.end("Hello From User!")
            }
        },
        {
            // using an object to match exact routes 
            // use this to match routes like '/' which
            // will unless match every route
            path: {
                path: '/',
                method: 'GET',
                exact: true
            },
            handler: (req, res) => {
                res.end('Hello From Home!')
            }
        }
    ]
})
```
To use different methods you can preceded that path using the method name.
For example:
```js
{
    path: 'POST /test',
    handler: (req, res) => {
        res.end('Hello From Test!)
    }
}
```
This will match the route only if the method is POST.

To get the server to do further processing you can use getServer() method.
```js
const httpServer = require('node-router');

// create a server with port 3000 and host
const server = new httpServer(3000, 'localhost');

server.start({
    ...
})

// you can get the server here

const httpServer = server.getServer();

httpServer.on('request', (req, res) => {
    // do something here
})
```

### License

MIT