export class SensorDataDto {
  constructor(public gravitySensorX: number | null, public gravitySensorY: number | null,
    public gravitySensorZ: number | null, public cameraSnapShotBase64: string | null,
    public clientUploadedDateTime: Date | null, public serverUploadedDateTime: Date) {
  }
}