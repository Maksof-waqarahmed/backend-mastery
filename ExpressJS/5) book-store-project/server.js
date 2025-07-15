require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db')
const bookRoutes = require('./routes/book-routes')

const app = express();
const PORT = process.env.PORT;

//connect to DB
connectToDB();

//middleware ---> express.json()
app.use(express.json())

//routes
app.use('/api/books', bookRoutes)

app.listen(PORT, () => {
    console.log("server is running at PORT", PORT);
})