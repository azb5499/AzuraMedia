const dataStorage = require('./units/DummyDataStore.js');
const Vehicle = require('./units/Vehicle.js');

const http = require('http');
const fileSystem = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            switch (req.url) {
                case '/form-submit':
                    const formData = new URLSearchParams(body);
                    const newVehicle = new Vehicle(
                        formData.get('make'),
                        formData.get('model'),
                        formData.get('km'),
                        formData.get('color'),
                        formData.get('location'),
                        formData.get('value')
                    );
                    const vehicleJson = JSON.stringify(newVehicle);
                    console.log('New vehicle JSON:', vehicleJson);

                    try {
                        newVehicle.validate();
                        dataStorage.addRecord(newVehicle);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: true, message: 'Vehicle added successfully' }));
                    } catch (error) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: false, error: error.message }));
                    }
                    break;

            }
        });
        return;
    }

    switch (req.url) {
        case "/":
            serveFile('./public/html/index.html', 'text/html', res);
            break;
        case "/add-cars":
            serveFile('./public/html/add-cars.html', 'text/html', res);
            break;
        case "/view-cars":
            serveFile('./public/html/view-cars.html', 'text/html', res);
            // Get all records from dataStorage
            break;
        default:
            if (req.url.match(/\.(css|js|png|jpg|jpeg|gif)$/)) {
                // Remove /public from req.url since it's already in base path
                const cleanUrl = req.url.replace(/^\/public\//, '/');
                const filePath = './public' + cleanUrl;
                const ext = path.extname(req.url);
                const contentTypes = {
                    '.css': 'text/css',
                    '.js': 'text/javascript',
                    '.png': 'image/png',
                    '.jpg': 'image/jpeg',
                    '.gif': 'image/gif'
                };
                serveFile(filePath, contentTypes[ext], res);
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end("<h1>404 Not Found</h1>");
            }
            break;
    }
});

function serveFile(filePath, contentType, res) {
    try {
        const content = fileSystem.readFileSync(filePath);
        res.statusCode = 200;
        res.setHeader('Content-Type', contentType);
        res.end(content);
    } catch (error) {
        console.error('Error serving file:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end("<h1>500 Internal Server Error</h1>");
    }
}

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});