import { Express } from "express";
import { orderManager } from "../models/orderManager";
import { SensorDataDto } from "../models/sensorDataDto";
import path from 'path'
import { uploadSensorDataManager } from "../models/uploadSensorDataManager";

export const routing = ((app: Express): void => {

  app.get('/', (_req, res) => {
    res.send('Hello World!');
  });

  app.post('/sensor-data', (req, res) => {
    const jsonData = req.body;
    console.log('jsonData!');
    console.log(JSON.stringify(jsonData).substring(0, 120) + "...");
    const dto = new SensorDataDto(req.body.GravitySensor.X, req.body.GravitySensor.Y, req.body.GravitySensor.Z, req.body.cameraSnapShotBase64, req.body.uploadDateTime, new Date());
    uploadSensorDataManager.replace(dto);
    res.send('OK');
  });

  app.get('/sensor-data', (req, res) => {
    if (uploadSensorDataManager.latestSensorData === null) {
      res.json(null);
    } else {
      const jsonDataStr = JSON.stringify(uploadSensorDataManager.latestSensorData);
      console.log('called GET /sensor-data ' + jsonDataStr);
      res.json(jsonDataStr);
    }
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