import express from 'express'
const app: express.Express = express();
const port = 3000;

//pubilcフォルダ内のファイルも読み込めるようにする。
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

/*app*/server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})