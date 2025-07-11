const express = require('express');
const path = require('path')

const app = express();
const PORT = 3000;
const producst = [
    {
        id: 1,
        title: "product 1"
    },
    {
        id: 2,
        title: "product 2"
    },
    {
        id: 3,
        title: "product 3"
    },
]

// set the view engine as ejs
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home', { title: "home", products: producst })
})

app.get('/about', (req, res) => {
    res.render('about', { title: "about" })
})

app.listen(PORT, () => {
    console.log("Server is running");
})