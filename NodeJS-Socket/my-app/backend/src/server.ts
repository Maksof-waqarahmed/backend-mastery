import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth-route';
import userRoute from './routes/user-route';

import { Server } from 'socket.io';
import http from 'http';

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

io.on('connection', (socket) => {

    socket.on('userJoin', (userName) => {
        // Handle custom events here
        console.log(`User joined: ${userName}`);
    })
})



server.listen(4000, () => {
    console.log('Server is running on port 4000');
});