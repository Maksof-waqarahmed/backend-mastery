## 🌐 Node.js HTTP Module

The **HTTP module** in Node.js allows you to **create web servers** and handle **HTTP requests and responses** directly — without any external library.

To use it, you must import the module:

```js
const http = require('http');
```

🧪 Creating a Simple Web Server
Here's how to create a basic HTTP server:
```js
const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
    // Set the response header
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Handle different routes
    if (req.url === '/') {
        res.end('Welcome to the Home Page');
    } else if (req.url === '/about') {
        res.end('About Us Page');
    } else {
        res.statusCode = 404;
        res.end('404 Page Not Found');
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
```

📂 Example Output
Visit in your browser:
http://localhost:3000/ → shows Home Page
http://localhost:3000/about → shows About Us Page
Any other URL → shows 404 Page Not Found

🧠 Why Use the HTTP Module?
Allows direct control over how servers and responses behave.
Great for learning how web servers work without frameworks.
Forms the foundation of many popular frameworks like Express.js.

✅ Real-World Usage
While the http module is great for learning, in real-world applications, you typically use Express.js or similar frameworks built on top of this module for cleaner syntax and more features.

🧪 You can also serve HTML:
```js
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
});

```
You’ve just built your first custom server in Node.js using the built-in HTTP module. 🚀