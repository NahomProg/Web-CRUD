const http = require('http');
const fs = require('fs');
const path = require('path');
const countries = require('./data/countries.json');

const server = http.createServer((req, res) => {
    console.log('URL ::', req.url);

    if (req.url === '/api/countries' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(countries));
    } 
    else if (req.url.startsWith('/api/countries/') && req.method === 'GET') {
        const countryId = req.url.split('/')[3];
        const country = countries.find(c => c.id === parseInt(countryId));
        
        if (country) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(country));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Country Not Found');
        }
    }
    else if (req.url === '/api/countries' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newCountry = JSON.parse(body);
            
            const countriesDataPath = path.join(__dirname, 'data', 'countries.json');
            const data = fs.readFileSync(countriesDataPath, 'utf-8');
            const countriesArray = JSON.parse(data);
            
            const newId = countriesArray.length > 0 ? countriesArray[countriesArray.length - 1].id + 1 : 1;
            newCountry.id = newId;
            
            countriesArray.push(newCountry);
            
            fs.writeFileSync(countriesDataPath, JSON.stringify(countriesArray, null, 2));
            
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newCountry));
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Server Running');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});