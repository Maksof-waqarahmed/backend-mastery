const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    if (url === '/') {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("This is our Home Page");
    } else if (url === '/projects') {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Projects");
    } else {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("This Page Can Not Be Found");
    }
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log("Server is Listening on ", PORT, " Port");
})
