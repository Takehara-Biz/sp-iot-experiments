import { Express } from "express";
import { orderManager } from "../models/orderManager";
import path from 'path'

export const routing = ((app: Express): void => {

  app.get('/', (_req, res) => {
    res.send('Hello World!');
  });

  app.post('/sensor-data', (req, res) => {
    const jsonData = req.body;
    console.log('jsonData!');
    console.log(jsonData);
    res.send('OK');
  });

  app.get('/add-order', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', '/views/add-order.html'));
  });

  app.post('/order', (req, res) => {
    console.log('param : ' + JSON.stringify(req.body));

    orderManager.enqueue(req.body.printString, req.body.vibrateFlag);

    res.redirect('/add-order');
  });

  app.get('/order', (req, res) => {
    const nextOrder = JSON.stringify(orderManager.dequeue());
    if (nextOrder === undefined) {
      res.json(null);
    } else {
      console.log('called GET /order ' + JSON.stringify(nextOrder));
      res.json(nextOrder);
    }
  });

});