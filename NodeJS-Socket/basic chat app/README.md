# Socket.IO Complete Documentation (Basic to Advanced)

This README covers the complete journey of learning and implementing Socket.IO in your real-time applications. From basic setup to advanced features like authentication and namespaces.

---

## 📘 Step-by-Step Topics Covered

| Step   | Topic                 | What to Learn                                                      |
| ------ | --------------------- | ------------------------------------------------------------------ |
| 1️⃣    | Introduction          | What is WebSocket, HTTP vs WebSocket, Why Socket.IO?               |
| 2️⃣    | Basic Setup           | Install Express + Socket.IO, serve frontend, connect client-server |
| 3️⃣    | Emitting Events       | `socket.emit`, `socket.on`, message flow                           |
| 4️⃣    | Broadcasting          | `socket.broadcast.emit`, `io.emit`, `to(room).emit`                |
| 5️⃣    | Rooms                 | Join room, send to room only, leave room                           |
| 6️⃣    | User Identification   | Attach usernames, track users                                      |
| 7️⃣    | Disconnect Events     | `disconnect`, handle user leaving                                  |
| 8️⃣    | Frontend Handling     | Show messages, handle input, styling                               |
| 9️⃣    | Multiple Users        | Connect multiple clients, maintain user list                       |
| 🔟     | Production Deployment | Host with Node.js or services like Heroku, Render, etc             |
| 1️⃣1️⃣ | Typing Indicator      | Show "User is typing..." on client UI                              |
| 1️⃣2️⃣ | Private Messaging     | 1-to-1 messaging via sockets                                       |
| 1️⃣3️⃣ | Authentication        | Secure socket connection using JWT or sessions                     |
| 1️⃣4️⃣ | Middleware            | Use socket-level middleware for validation                         |
| 1️⃣5️⃣ | Namespaces            | Multiple chat streams on same server                               |
| 1️⃣6️⃣ | Rate Limiting         | Prevent abuse by limiting actions per interval                     |
| 1️⃣7️⃣ | File Sharing          | Send images and files using sockets                                |

---

## 1️⃣ Introduction

**WebSocket:** Full-duplex communication protocol over a single TCP connection.

**HTTP vs WebSocket:**

* HTTP: Request-response model
* WebSocket: Persistent connection with bi-directional data flow

**Why Socket.IO?**

* Handles reconnections
* Easy API
* Built-in room support
* Works with Node.js

---

## 2️⃣ Basic Setup

**Installation:**

```bash
npm install express socket.io
```

**Server (index.js):**

```js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');
});

server.listen(3000, () => console.log('Server started on port 3000'));
```

**Client (public/index.html):**

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();
</script>
```

---

## 3️⃣ Emitting Events

**Client:**

```js
socket.emit('message', 'Hello Server!');
```

**Server:**

```js
io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    console.log(msg);
  });
});
```

---

## 4️⃣ Broadcasting

```js
// Server
socket.broadcast.emit('new-user', 'Another user joined');
io.emit('everyone', 'Message to all');
io.to('room1').emit('room-message', 'Hello Room1');
```

---

## 5️⃣ Rooms

```js
// Join a room
socket.join('room1');

// Send to room
io.to('room1').emit('room-msg', 'Message to Room 1');

// Leave room
socket.leave('room1');
```

---

## 6️⃣ User Identification

```js
const users = {};

io.on('connection', (socket) => {
  socket.on('new-user', (username) => {
    users[socket.id] = username;
  });
});
```

---

## 7️⃣ Disconnect Events

```js
socket.on('disconnect', () => {
  console.log('User disconnected');
  delete users[socket.id];
});
```

---

## 8️⃣ Frontend Handling

```html
<input id="message" />
<button onclick="sendMsg()">Send</button>
<ul id="messages"></ul>

<script>
  const socket = io();
  function sendMsg() {
    const msg = document.getElementById('message').value;
    socket.emit('message', msg);
  }
  socket.on('message', msg => {
    const li = document.createElement('li');
    li.textContent = msg;
    document.getElementById('messages').appendChild(li);
  });
</script>
```

---

## 9️⃣ Multiple Users

```js
const users = {};

io.on('connection', (socket) => {
  socket.on('new-user', (username) => {
    users[socket.id] = username;
    io.emit('user-list', Object.values(users));
  });
});
```

---

## 🔟 Production Deployment

* Use `process.env.PORT` for dynamic port
* Services: Render, Heroku, Vercel (for frontend), or DigitalOcean/VPS

**Example:**

```js
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

* Use `pm2` for production process management
* Serve static frontend via `express.static()` or separate hosting

---

## 1️⃣1️⃣ Typing Indicator

**Server:**

```js
socket.on('typing', (username) => {
  socket.broadcast.emit('typing', `${username} is typing...`);
});
```

**Client:**

```js
input.addEventListener('input', () => {
  socket.emit('typing', username);
});

socket.on('typing', (msg) => {
  typingDiv.innerText = msg;
});
```

---

## 1️⃣2️⃣ Private Messaging

```js
socket.on('private-message', ({ to, message }) => {
  io.to(to).emit('private-message', { from: socket.id, message });
});
```

You must store user socket IDs to send targeted messages.

---

## 1️⃣3️⃣ Authentication with JWT

Use JWT to authorize users before they connect:

```js
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = jwt.verify(token, SECRET);
    socket.user = user;
    next();
  } catch {
    next(new Error("Authentication error"));
  }
});
```

---

## 1️⃣4️⃣ Middleware in Socket.IO

Add logic between connection:

```js
io.use((socket, next) => {
  if (isValid(socket)) next();
  else next(new Error('Blocked'));
});
```

---

## 1️⃣5️⃣ Namespaces

```js
const adminNamespace = io.of('/admin');
adminNamespace.on('connection', (socket) => {
  console.log('Admin connected');
});
```

Clients connect with:

```js
const socket = io('/admin');
```

---

## 1️⃣6️⃣ Rate Limiting / Throttling

Use custom logic or packages like `socket.io-rate-limiter`:

```js
let lastMsgTime = {};
io.on('connection', socket => {
  socket.on('message', () => {
    const now = Date.now();
    if (now - (lastMsgTime[socket.id] || 0) < 2000) return;
    lastMsgTime[socket.id] = now;
    // handle message
  });
});
```

---

## 1️⃣7️⃣ File Sharing over Socket.IO

Convert files to base64 or use `socket.io-stream`:

```js
socket.on('file-upload', ({ fileName, fileData }) => {
  const buffer = Buffer.from(fileData, 'base64');
  fs.writeFileSync(`./uploads/${fileName}`, buffer);
});
```

Client:

```js
const reader = new FileReader();
reader.onload = () => {
  socket.emit('file-upload', {
    fileName: file.name,
    fileData: reader.result.split(',')[1]
  });
};
reader.readAsDataURL(file);
```

---

**Author:** Waqar Rana
**Topics Covered:** Full Socket.IO Roadmap with theory, practice, and advanced use cases.
