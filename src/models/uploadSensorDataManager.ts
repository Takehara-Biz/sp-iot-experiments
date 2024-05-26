import { SensorDataDto } from "./sensorDataDto";

class UploadSensorDataManager {
  private _latestSensorData : SensorDataDto|null = null;
  replace(latestSensorData: SensorDataDto): void{
    this._latestSensorData = latestSensorData;
  }
  public get latestSensorData() : SensorDataDto|null {
    return this._latestSensorData;
  }
}
export const uploadSensorDataManager = new UploadSensorDataManager();