const https = require('https');
const fs = require('fs');
const domain = 'www.entel.pe';

fs.readFile('rutas.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }
  const routes = data.split('\n').map(route => route.trim());

  routes.forEach((route, index) => {
    const fullUrl = `https://${domain}${route}`;
    const request = https.get(fullUrl, (response) => {
        console.log(`${fullUrl}, ${response.statusCode}`);
    });

    request.on('error', (error) => {
      console.error(`Error al intentar acceder a ${fullUrl}: ${error.message}`);
    });
  });
});
