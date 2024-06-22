// @ts-ignore
const cameraManager = new CameraManager();

// @ts-ignore
const gravitySensorManager = new GravitySensorManager();

// @ts-ignore
const accelerometerManager = new AccelerometerManager();

// @ts-ignore
const deviceOrientationManager = new DeviceOrientationManager();

// @ts-ignore
const geolocationManager = new GeolocationManager();

class JsonDataManager {
  constructor() {
    setInterval(() => {
      this.collectData();
      document.getElementById('jsonData')!.innerHTML = JSON.stringify(this.jsonData);
    }, 1000);
  }

  jsonData = {};
  collectData(): void {
    this.jsonData = {
      uploadDateTime: new Date().toISOString()
    };
    if (deviceOrientationManager.isRecording) {
      this.jsonData = Object.assign(this.jsonData, {
        deviceOrientation: {
          alpha: deviceOrientationManager.alpha,
          beta: deviceOrientationManager.beta,
          gamma: deviceOrientationManager.gamma
        },
      });
    }
    if (geolocationManager.isRecording) {
      this.jsonData = Object.assign(this.jsonData, {
        geolocation: {
          lat: geolocationManager.lat,
          lng: geolocationManager.lng
        },
      });
    }
    if (gravitySensorManager.isRecording) {
      this.jsonData = Object.assign(this.jsonData, {
        gravitySensor: {
          x: gravitySensorManager.x,
          y: gravitySensorManager.y,
          z: gravitySensorManager.z
        }
      });
    }
    if (cameraManager.isRecording) {
      this.jsonData = Object.assign(this.jsonData, { cameraSnapShotBase64: cameraManager.snapShotBase64 });
    }
  }
}
const jsonDataManager = new JsonDataManager();

class SendJSONDataManager {
  static SEND_INTERVAL_MS = 500;
  send(): void {
    const sendData = document.getElementById('jsonData')!.innerHTML;

    fetch('/sensor-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: sendData
    }).then((response: Response) => {
      console.log('response! ' + response.json());
    }).catch((error) => {
      console.error('error! ' + error);
    });
  }
}
const sendJSONDataManager = new SendJSONDataManager();
setInterval(() => {
  const checkBox = document.getElementById('sendFlag')! as HTMLInputElement;
  if (checkBox.checked) {
    sendJSONDataManager.send();
  }
}, SendJSONDataManager.SEND_INTERVAL_MS);