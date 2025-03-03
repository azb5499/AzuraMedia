const dataStorage = require('./units/DBDataStore.js');
const Vehicle = require('./units/Vehicle.js');

const http = require('http');
const fileSystem = require('fs');
const path = require('path');

const server = http.createServer(async (req, res) => {
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
                    

                    try {
                        newVehicle.validate();
                        dataStorage.addRecord(newVehicle);
                        serveFile('./public/html/index.html', 'text/html', res);
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
            break;
        case "/api/cars":
            const allRecords = await dataStorage.getAllRecords();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(allRecords);
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

(function createPeriodicRecord() {
    let yearCount = 2000;
    setInterval(() => {
        const BMW = new Vehicle(
            "BMW",
            yearCount,
            Math.floor(Math.random() * (100000 - 50000 + 1)) + 50000,
            "white",
            "CT",
            Math.floor(Math.random() * (150000 - 100000 + 1)) + 100000
        );
        const Volkswagen = new Vehicle(
            "VolksWagen",
            yearCount,
            Math.floor(Math.random() * (100000 - 50000 + 1)) + 50000,
            "black",
            "JHB",
            Math.floor(Math.random() * (150000 - 100000 + 1)) + 100000
        );
        dataStorage.addRecord(BMW);
        dataStorage.addRecord(Volkswagen);
        yearCount++;
        }, 20 * 60 * 1000); // 20 minutes in milliseconds
})();


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