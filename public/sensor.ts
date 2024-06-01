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
      deviceOrientation : {
        alpha: deviceOrientationManager.alpha,
        beta: deviceOrientationManager.beta,
        gamma: deviceOrientationManager.gamma
      },
      geolocation : {
        lat: geolocationManager.lat,
        lng: geolocationManager.lng
      },
      gravitySensor : {
        x: gravitySensorManager.x,
        y: gravitySensorManager.y,
        z: gravitySensorManager.z,
      },
      uploadDateTime : new Date().toISOString()
    };
    if (cameraManager.snapShotBase64 !== "") {
      this.jsonData = Object.assign(this.jsonData, { "cameraSnapShotBase64": cameraManager.snapShotBase64 });
    }
  }
}
const jsonDataManager = new JsonDataManager();

class SendJSONDataManager {
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
}, 3000);