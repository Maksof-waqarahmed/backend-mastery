const express = require('express');

const app = express();

const myMiddleware = (req, res, next) => {
    console.log("This will run on every req");

    next();
}

app.use(myMiddleware)

app.get('/', (req, res) => {
    res.send("Home Page");
})

app.get('/about', (req, res) => {
    res.send("About Page");
})

app.listen(3000, () => {
    console.log("Server is running");
})