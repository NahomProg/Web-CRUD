const http = require('http');

const getAllCountries = () => {
    http.get('http://localhost:3000/api/countries', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log('All Countries:', JSON.parse(data));
        });
    });
};

const getCountryById = (id) => {
    http.get(`http://localhost:3000/api/countries/${id}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log(`Country ${id}:`, JSON.parse(data));
        });
    });
};

const addCountry = () => {
    const newCountry = {
        name: "Germany",
        capital: "Berlin",
        population: 83120000,
        continent: "Europe",
        language: "German",
        currency: "Euro"
    };
    
    const postData = JSON.stringify(newCountry);
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/countries',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };
    
    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log('Added Country:', JSON.parse(data));
        });
    });
    
    req.write(postData);
    req.end();
};

getAllCountries();
getCountryById(1);
addCountry();