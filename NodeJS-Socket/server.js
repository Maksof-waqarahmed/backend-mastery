const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

const server = http.createServer(app);

// initiate socket IO and then attach this to the http server 
const io = socketIo(server);

app.use(express.static('public'));
const userNames = {};

io.on('connection', (socket) => {
    console.log("A User is connected");

    // Listen for the join event
    socket.on('join', (user) => {
        socket.user = user; // Store the user name in the socket object
        console.log(`${user} has joined the chat`);
        userNames[socket.id] = user;
        //broadcast the user list to all connected clients
        io.emit('userList', Object.values(userNames));
    })

    socket.on('chatMessage', (data) => {
        console.log(`${data.user}: ${data.message}`);
        // broadcast the message to all connected clients
        io.emit('userMessage', data);
    });
    // discount event
    socket.on('disconnect', () => {
        console.log(`${userNames[socket.id]} has left the chat`);
        delete userNames[socket.id];
        socket.user = null;
        // broadcast the updated user list to all connected clients
        io.emit('updatedUserList', Object.values(userNames));
    });
})

server.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
})