const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200; // Set the status code to 200 (OK)
    res.setHeader('Content-Type', 'text/plain'); // Set the content type to plain text
    res.end('Hello, World!\n'); // Send a response
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});