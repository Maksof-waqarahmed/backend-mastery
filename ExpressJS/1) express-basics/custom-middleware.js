const express = require('express');

const app = express();

const timeStampLogger = (req, res, next) => {
    const timeStamp = new Date().toISOString()
    console.log(`${timeStamp} from ${req.method} to ${req.url}`)
    next();
}

app.use(timeStampLogger)

app.get('/', (req, res) => {
    res.send("Home Page");
})

app.get('/about', (req, res) => {
    res.send("About Page");
})

app.listen(3000, () => {
    console.log("Server is running");
})