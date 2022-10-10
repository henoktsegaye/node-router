## Stupid Router 🧭

###  Simple Router for Node.js! Use it to get started fast!.

This is a small library to create router and server fast in **Node.js**.**Not Recommended for Production**.
If you want a simple library to create a router and server in **Node.js** for testing things out this is the right library for you.
I would not recommend using this in production.

### Installation 🚀

```bash

npm install stupid-router

# pnpm

pnpm install stupid-router

#yarn

yarn add stupid-router

```

### Usage

```js
const httpServer = require('stupid-router');

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
To use different methods you can proceed that path using the method name.
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
***i.e** Make sure to use Capital letters for the method name.*

To get the server to do further processing you can use `getServer()` method, which will return the server object.

```js

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

Configuring not found and/or error handler. You can pass a function to the start method to handle not found and error during processing your routes.
```js

// create a server with port 3000 and host
const server = new httpServer(3000, 'localhost');

server.start({
    ...,
    notFoundHandler: (req, res) => {
        res.end('Not Found!')
    },
    errorHandler: (err, req, res) => {
        res.end('Error!')
    }
})


### License

MIT