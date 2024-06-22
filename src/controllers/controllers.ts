import { Express } from "express";
import { orderManager } from "../models/orderManager";
import { SensorDataDto } from "../models/sensorDataDto";
import path from 'path'
import { uploadSensorDataManager } from "../models/uploadSensorDataManager";
import { LogUtil } from "../utils/logUtil";

export const routing = ((app: Express): void => {

  app.get('/', (_req, res) => {
    res.send('Hello World!');
  });

  app.post('/sensor-data', (req, res) => {
    const jsonData = req.body;
    LogUtil.info(JSON.stringify(jsonData));
    const dto = new SensorDataDto(jsonData.gravitySensor.x, jsonData.gravitySensor.y, jsonData.gravitySensor.z, jsonData.cameraSnapShotBase64, jsonData.uploadDateTime, new Date());
    uploadSensorDataManager.replace(dto);
    res.send('OK');
  });

  app.get('/sensor-data', (req, res) => {
    if (uploadSensorDataManager.latestSensorData === null) {
      res.json(null);
    } else {
      const jsonDataStr = JSON.stringify(uploadSensorDataManager.latestSensorData);
      LogUtil.info(jsonDataStr);
      res.json(jsonDataStr);
    }
  });

  app.get('/server.html', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', '/views/server.html'));
  });

  app.post('/order', (req, res) => {
    console.log('param : ' + JSON.stringify(req.body));

    orderManager.enqueue(req.body.printString, req.body.vibrateFlag);

    res.redirect('/server-side');
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