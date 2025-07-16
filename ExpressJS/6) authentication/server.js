require('dotenv').config();
const express = require('express');
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth-routes')
const homeRoutes = require('./routes/home-routes')

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes)
app.listen(PORT, () => {
    console.log("Server is running at PORT", PORT);
})