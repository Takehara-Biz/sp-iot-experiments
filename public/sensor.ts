// @ts-ignore
const cameraManager = new CameraManager();

// 重力加速度センサー
class GravitySensorManager {
  constructor() {
    let gravitySensor = new GravitySensor({ frequency: 1 });
    gravitySensor.addEventListener("reading", (_e: Event) => {
      console.log(`X 軸方向の重力 ${gravitySensor.x}`);
      console.log(`Y 軸方向の重力 ${gravitySensor.y}`);
      console.log(`Z 軸方向の重力 ${gravitySensor.z}`);
      document.getElementById('gravityXSpan')!.innerHTML = '' + gravitySensor.x;
      document.getElementById('gravityYSpan')!.innerHTML = '' + gravitySensor.y;
      document.getElementById('gravityZSpan')!.innerHTML = '' + gravitySensor.z;
      this.x = gravitySensor.x!;
      this.y = gravitySensor.y!;
      this.z = gravitySensor.z!;
    });

    gravitySensor.start();
  }

  x: number = 0;
  y: number = 0;
  z: number = 0;
}
const gravitySensorManager = new GravitySensorManager();

// 加速度センサー
class AccelerometerManager {
  constructor() {
    const acl = new Accelerometer({ frequency: 1 });
    acl.addEventListener("reading", () => {
      console.log(`X 軸方向の加速度 ${acl.x}`);
      console.log(`Y 軸方向の加速度 ${acl.y}`);
      console.log(`Z 軸方向の加速度 ${acl.z}`);
      document.getElementById('accelerationXSpan')!.innerHTML = '' + acl.x;
      document.getElementById('accelerationYSpan')!.innerHTML = '' + acl.y;
      document.getElementById('accelerationZSpan')!.innerHTML = '' + acl.z;
      this.x = acl.x!;
      this.y = acl.y!;
      this.z = acl.z!;
    });

    acl.start();
  }

  x: number = 0;
  y: number = 0;
  z: number = 0;
}
const accelerometerManager = new AccelerometerManager();

// @ts-ignore
const deviceOrientationManager = new DeviceOrientationManager();

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

class GeolocationManager {
  lat: number = 0.0;
  lng: number = 0.0;
  constructor() {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          document.getElementById('positionLatSpan')!.innerText = '' + this.lat;
          document.getElementById('positionLngSpan')!.innerText = '' + this.lng;
        });
      }, 3000);
    } else {
      /* geolocation IS NOT available */
    }
  }
}
const geolocationManager = new GeolocationManager();