const http = require('http');

const server = http.createServer((req, res) => {
    console.log("Req", req);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello! from nodeJS HTTP module");
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log("Server is Listening on ", PORT, " Port");
})
