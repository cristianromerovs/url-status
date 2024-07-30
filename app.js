const https = require('https');
const fs = require('fs');
const domain = 'www.entel.pe';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      console.log(`${response.statusCode}`);
      resolve();
    }).on('error', (error) => {
      console.error(`Error al intentar acceder a ${url}: ${error.message}`);
      resolve(); // Resolvemos para que continue con la siguiente ruta incluso si hay un error
    });
  });
}

fs.readFile('rutas.txt', 'utf8', async (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }
  const routes = data.split('\n').map(route => route.trim());

  for (const route of routes) {
    const fullUrl = `https://${domain}${route}`;
    await fetchUrl(fullUrl);
  }
});
