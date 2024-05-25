import express from 'express'
const app: express.Express = express();
const port = 3000;

// can handle request body as json
app.use(express.json())
// make public folder public
app.use(express.static('public'));

import fs from 'fs'
import https from 'https'
const server = https.createServer({
  key: fs.readFileSync('./https/privatekey.pem'),
  cert: fs.readFileSync('./https/cert.pem'),
}, app)

app.get('/', (_req, res) => {
  res.send('Hello World!');
})

app.post('/sensor-data', (req, res) => {
  const jsonData = req.body;
  console.log('jsonData!');
  console.log(jsonData);
  res.send('OK');
})

/*app*/server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})