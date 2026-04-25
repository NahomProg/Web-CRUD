const http = require('http');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getAllCountries = () => {
    http.get('http://localhost:3000/api/countries', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log('\nAll Countries:');
            const countries = JSON.parse(data);
            countries.forEach(c => {
                console.log(`  ${c.id}. ${c.name} - ${c.capital}`);
            });
            rl.close();
        });
    });
};

const addCountry = () => {
    rl.question('Country name: ', (name) => {
        rl.question('Capital: ', (capital) => {
            rl.question('Population: ', (population) => {
                rl.question('Continent: ', (continent) => {
                    rl.question('Language: ', (language) => {
                        rl.question('Currency: ', (currency) => {
                            const newCountry = {
                                name, capital, population: parseInt(population),
                                continent, language, currency
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
                                    console.log('\n✅ Added:', JSON.parse(data));
                                    setTimeout(getAllCountries, 500);
                                });
                            });
                            req.write(postData);
                            req.end();
                        });
                    });
                });
            });
        });
    });
};

addCountry();