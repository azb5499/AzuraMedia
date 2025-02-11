const http = require('http');
const fileSystem = require('fs');


const server = http.createServer((req, res) => {
    if (req.url == "/") {
        req.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(fileSystem.readFileSync('./public/index.html'));
    } else if (req.url == "/add-cars") {
        req.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(fileSystem.readFileSync('./public/add-cars.html'));
    }
    else if (req.url == "/view-cars") {
        req.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(fileSystem.readFileSync('./public/add-cars.html'));
    } else {
        req.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end("<h1>404 Page Not Found</h1>");
    };
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});