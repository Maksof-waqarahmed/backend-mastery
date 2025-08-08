import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth-route';
import userRoute from './routes/user-route';

import { Server } from 'socket.io';
import http from 'http';
import { saveMessage } from './quries/chat';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    }
});

// Middleware to parse JSON requests
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

const userSockets = new Map();

io.on('connection', (socket) => {

    socket.on('userJoin', (user) => {
        userSockets.set(user.id, socket.id);
        console.log(`User joined: ${user.name}`);
        io.emit('userJoined', user);
    })

    socket.on('userMessage', async (message) => {
        if (message && message.sender && message.receiver && message.message) {
            const newMessage = await saveMessage(message)
            const receiverSocketId = userSockets.get(message.receiver);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('newMessage', newMessage);
            }
        }
    })
})



server.listen(4000, () => {
    console.log('Server is running on port 4000');
});