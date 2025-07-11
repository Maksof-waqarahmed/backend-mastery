## 🚀 Express.js Basics in Node.js

**Express.js** is a fast, minimal, and flexible web framework for Node.js that simplifies handling HTTP requests, building APIs, middleware logic, and routing.

---

## 📦 Installing Express

```bash
npm install express
```

✅ Basic Express Server Setup
```js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
```

🔹 app.get() – Define a GET Route
```js
app.get('/', (req, res) => {
  res.send('Welcome to Express!');
});
```
This handles GET requests on the root / route.
You can define multiple routes like /about, /contact, etc.

🔸 app.listen() – Start the Server
```js
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```
Starts your server and listens on a specific port for incoming requests.

📌 req.params – Accessing URL Parameters
```js
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID is ${userId}`);
});
```

🔍 Example:
```bash
GET http://localhost:3000/user/123
→ Response: "User ID is 123"
```
Use this to handle dynamic routes based on user input.

📦 Dynamic GET – Get Item by ID (Example)
```js
const products = [
  { id: 1, name: 'Pen' },
  { id: 2, name: 'Notebook' },
];

app.get('/product/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).send('Product not found');
  }

  res.json(product);
});
```

🧱 Middleware in Express
Middleware is a function that runs between the request and response, and can be used for:

Logging
Authentication
Parsing
Error handling

🔹 Custom Middleware Example

```js
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // pass control to the next middleware or route
};

app.use(logger);
```

✅ Recap of Express API Methods
| Method         | Description                                  |
| -------------- | -------------------------------------------- |
| `app.get()`    | Handles HTTP GET requests                    |
| `app.post()`   | Handles HTTP POST requests                   |
| `app.use()`    | Mounts middleware                            |
| `app.listen()` | Starts the server                            |
| `req.params`   | Access URL route parameters (dynamic routes) |


🧠 Summary
Express simplifies creating web servers in Node.js.
Use .get() for defining routes.
Use .params to access dynamic values.
Middleware helps you organize logic and process requests.

✅ Express is ideal for building REST APIs, backend apps, and full-stack web projects.