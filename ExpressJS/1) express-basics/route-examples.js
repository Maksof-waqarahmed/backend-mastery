const express = require('express');

const app = express();
const PORT = 3000;

const products = [
    {
        id: 1,
        products: "Product 1"
    },
    {
        id: 2,
        products: "Product 2"
    },
    {
        id: 3,
        products: "Product 3"
    },
]

app.get('/', (req, res) => {
    res.send("Welcome to home page");
})

app.get('/products', (req, res) => {
    res.json({
        message: "Data Send succesfully",
        data: products,
        status: 200
    })
})

app.get('/products/:id', (req, res) => {
    const productID = parseInt(req.params.id);
    const isFoundItem = products.find(item => item.id === productID);

    if (!isFoundItem) res.status(400).send("Item Note Found")

    res.json(isFoundItem);
})


app.listen(PORT, () => {
    console.log("server is running")
})