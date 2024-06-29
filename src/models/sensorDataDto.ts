export class SensorDataDto {
  constructor(
    public gravitySensorDto: GravitySensorDto,
    public accelerometerDto: AccelerometerDto,
    public deviceOrientationDto: DeviceOrientationDto,
    public geolocationDto: GeolocationDto,
    public cameraSnapShotBase64: string | null,
    public clientUploadedDateTime: Date | null,
    public serverUploadedDateTime: Date) {
  }
  public static convert(jsonData: any) :SensorDataDto {
    let gravitySensorDto = new GravitySensorDto(null, null, null);
    gravitySensorDto.x = jsonData?.gravitySensor?.x;
    gravitySensorDto.y = jsonData?.gravitySensor?.y;
    gravitySensorDto.z = jsonData?.gravitySensor?.z;
    let accelerometerDto = new AccelerometerDto(null, null, null);
    accelerometerDto.x = jsonData?.accelerometer?.x;
    accelerometerDto.y = jsonData?.accelerometer?.y;
    accelerometerDto.z = jsonData?.accelerometer?.z;
    let deviceOrientationDto = new DeviceOrientationDto(null, null, null, null, null);
    deviceOrientationDto.adjustedValue = jsonData?.deviceOrientation?.adjustedValue;
    deviceOrientationDto.absolute = jsonData?.deviceOrientation?.absolute;
    deviceOrientationDto.alpha = jsonData?.deviceOrientation?.alpha;
    deviceOrientationDto.beta = jsonData?.deviceOrientation?.beta;
    deviceOrientationDto.gamma = jsonData?.deviceOrientation?.gamma;
    let geolocationDto = new GeolocationDto(null, null);
    geolocationDto.lat = jsonData?.geolocation?.lat;
    geolocationDto.lng = jsonData?.geolocation?.lng;

    return new SensorDataDto(gravitySensorDto, accelerometerDto, deviceOrientationDto, geolocationDto, jsonData.cameraSnapShotBase64, jsonData.uploadDateTime, new Date());
  }
}

export class GravitySensorDto {
  constructor(
    public x: number | null,
    public y: number | null,
    public z: number | null,
  ){}
}

export class AccelerometerDto {
  constructor(
    public x: number | null,
    public y: number | null,
    public z: number | null,
  ){}
}

export class DeviceOrientationDto {
  constructor(
    public adjustedValue: number | null,
    public absolute: number | null,
    public alpha: number | null,
    public beta: number | null,
    public gamma: number | null,
  ){}
}

export class GeolocationDto {
  constructor(
    public lat: number | null,
    public lng: number | null,
  ){}
}