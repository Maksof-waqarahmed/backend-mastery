## 🌐 EJS in Express.js

**EJS (Embedded JavaScript Templates)** is a simple templating engine that lets you generate HTML markup with plain JavaScript.

It's used with **Express.js** to create dynamic web pages by embedding JS variables, loops, and partials (components) directly into HTML files.

---

## 📦 Installation

```bash
npm install ejs
```

⚙️ Express Setup with EJS
```js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Sample product data
const products = [
  { id: 1, title: "product 1" },
  { id: 2, title: "product 2" },
  { id: 3, title: "product 3" },
];

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set path to the 'views' folder
app.set('views', path.join(__dirname, 'views'));

// Home Route
app.get('/', (req, res) => {
  res.render('home', { title: "home", products });
});

// About Route
app.get('/about', (req, res) => {
  res.render('about', { title: "about" });
});

// Start the server
app.listen(PORT, () => {
  console.log("🚀 Server is running on http://localhost:" + PORT);
});
```
📁 Folder Structure

```pgsql
project/
│
├── views/
│   ├── home.ejs
│   ├── about.ejs
│   └── components/
│       └── header.ejs
│
├── index.js
└── package.json
```

🧩 EJS Templates
📄 views/home.ejs
```ejs
<%- include('components/header.ejs') %>

<h1>This is our Home Page</h1>

<ul>
  <% products.forEach(product => { %>
    <li><%= product.title %></li>
  <% }) %>
</ul>
```

📄 views/about.ejs

```ejs
<%- include('components/header.ejs') %>

<h1>This is our About Page</h1>
```

🧱 views/components/header.ejs
```ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
</head>
<body>
  <h1>This is our Header component</h1>
</body>
</html>
```

🔍 EJS Syntax
| Syntax                      | Purpose                              |
| --------------------------- | ------------------------------------ |
| `<%= variable %>`           | Output escaped content               |
| `<%- variable %>`           | Output unescaped (HTML safe) content |
| `<% code %>`                | Run JavaScript logic (no output)     |
| `<% if () { %> ... <% } %>` | Conditional rendering                |
| `<% array.forEach() %>`     | Loop over data                       |

🧠 Summary
| Feature            | Description                                     |
| ------------------ | ----------------------------------------------- |
| `res.render()`     | Renders an EJS template with dynamic data       |
| `<%- include() %>` | Imports reusable components like headers        |
| `.ejs` files       | Live inside the `views` folder (or custom path) |
| Dynamic Content    | Easily loop and insert server-side data         |

✅ EJS is a great choice when building simple server-rendered apps with Node and Express. It allows clean separation of logic and presentation, and makes templating powerful and reusable.