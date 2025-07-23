require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/products-route');
const app = express()
app.use(express.json());

app.use('/api/products', productRoutes)

app.listen(3000, () => {
    console.log("Server is running 3000 PORT");
})
