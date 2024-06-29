import express from 'express'
import { addMiddleware } from "./controllers/middleware";

const app: express.Express = express();
const port = 443;

// can handle request body as json from fetch api (Ajax)
app.use(express.json());
// can handle form body as json from form tag
app.use(express.urlencoded({ extended: true }));
// make public folder public
app.use(express.static('public'));


import {routing} from './controllers/controllers'
routing(app);
addMiddleware(app);

import fs from 'fs'
import https from 'https'
const server = https.createServer({
  key: fs.readFileSync('./https/privatekey.pem'),
  cert: fs.readFileSync('./https/cert.pem'),
}, app);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
