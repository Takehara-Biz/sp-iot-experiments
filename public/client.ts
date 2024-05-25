class CameraManager {

  mediaStream: MediaStream | null = null;
  setting = {
    audio: false,
    video: {
      //width: 100%,
      height: 300,
      facingMode: { exact: 'environment' },
      // facingMode: 'user',
    },
  };

  videoStart() {
    this.videoStop();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(this.setting).then((stream) => {
        document.getElementById('js-camera')!.innerHTML = '';
        const video = document.getElementById('video') as HTMLVideoElement;
        this.mediaStream = stream;
        video!.srcObject = stream;
        video!.play();
      }).catch((e) => {
        document.getElementById('js-camera')!.innerHTML = 'Cannot use camera: ' + e;
        //$('.js-camera').html('Cannot use camera: ' + a);
      });
    }
  }

  videoStop() {
    if (this.mediaStream !== null) {
      this.mediaStream.getVideoTracks().forEach((camera) => {
        camera.stop();
      });
      this.mediaStream = null;
    }
  }

  videoChangeCamera() {
    if (this.setting.video.facingMode.exact == 'user') {
      this.setting.video.facingMode.exact = 'environment';
    } else {
      this.setting.video.facingMode.exact = 'user';
    }
    if (this.mediaStream !== null) {
      this.videoStop();
      this.videoStart();
    }
  }
}
const cameraManager = new CameraManager();

// 重力加速度センサー
class GravitySensorManager{
  constructor(){
    let gravitySensor = new GravitySensor({ frequency: 1 });
    gravitySensor.addEventListener("reading", (e) => {
      console.log(`X 軸方向の重力 ${gravitySensor.x}`);
      console.log(`Y 軸方向の重力 ${gravitySensor.y}`);
      console.log(`Z 軸方向の重力 ${gravitySensor.z}`);
      document.getElementById('gravityXSpan')!.innerHTML = gravitySensor.x;
      document.getElementById('gravityYSpan')!.innerHTML = gravitySensor.y;
      document.getElementById('gravityZSpan')!.innerHTML = gravitySensor.z;
      this.x = gravitySensor.x;
      this.y = gravitySensor.y;
      this.z = gravitySensor.z;
    });
    
    gravitySensor.start();
  }

  x: number = 0;
  y: number = 0;
  z: number = 0;
}
const gravitySensorManager = new GravitySensorManager();

// 加速度センサー
class AccelerometerManager{
  constructor(){
    const acl = new Accelerometer({ frequency: 1 });
    acl.addEventListener("reading", () => {
      console.log(`X 軸方向の加速度 ${acl.x}`);
      console.log(`Y 軸方向の加速度 ${acl.y}`);
      console.log(`Z 軸方向の加速度 ${acl.z}`);
      document.getElementById('accelerationXSpan')!.innerHTML = acl.x;
      document.getElementById('accelerationYSpan')!.innerHTML = acl.y;
      document.getElementById('accelerationZSpan')!.innerHTML = acl.z;
      this.x = acl.x;
      this.y = acl.y;
      this.z = acl.z;
    });

    acl.start();
  }

  x: number = 0;
  y: number = 0;
  z: number = 0;
}
const accelerometerManager = new AccelerometerManager();

// コンパス（方位）

class DeviceOrientationManager {

  constructor() {
    window.addEventListener("deviceorientationabsolute", (event: DeviceOrientationEvent) => {
      if(new Date().getTime() < this.lastEventDateTime + 1000){
        return;
      }

      console.log(`${event.alpha} : ${event.beta} : ${event.gamma}`);
      const adjustedValue = this.compassHeading(event.alpha!, event.beta!, event.gamma!);
      document.getElementById('deviceOrientationAdjustedValue')!.innerHTML = '' + adjustedValue;
      document.getElementById('deviceOrientationAbsolute')!.innerHTML = '' + event.absolute;
      document.getElementById('deviceOrientationAlpha')!.innerHTML = '' + event.alpha;
      document.getElementById('deviceOrientationBeta')!.innerHTML = '' + event.beta;
      document.getElementById('deviceOrientationGamma')!.innerHTML = '' + event.gamma;
      document.getElementById('deviceOrientResult')!.innerHTML = this.judgeOrient(event);
      this.adjustedValue = adjustedValue;
      this.absolute = event.absolute;
      this.alpha = event.alpha!;
      this.beta = event.beta!;
      this.gamma = event.gamma!;
      this.lastEventDateTime = new Date().getTime();
    });
  }

  lastEventDateTime: number = 0;
  adjustedValue: number = 0;
  absolute: boolean = false;
  alpha: number = 0;
  beta: number = 0;
  gamma: number = 0;

  compassHeading(alpha: number, beta: number, gamma: number) {
    var degtorad = Math.PI / 180; /*  度° ↔ ラジアン 間の換算用  */

    var _x = beta ? beta * degtorad : 0; // β 値
    var _y = gamma ? gamma * degtorad : 0; // γ 値
    var _z = alpha ? alpha * degtorad : 0; // α 値

    var cX = Math.cos(_x);
    var cY = Math.cos(_y);
    var cZ = Math.cos(_z);
    var sX = Math.sin(_x);
    var sY = Math.sin(_y);
    var sZ = Math.sin(_z);

    /*  V の x , y 成分を計算する  */
    var Vx = - cZ * sY - sZ * sX * cY;
    var Vy = - sZ * sY + cZ * sX * cY;

    /*  コンパスの向きを計算する  */
    var compassHeading = Math.atan(Vx / Vy);

    /*  コンパスの向きを， 0 以上 2 π 未満に換算する  */
    if (Vy < 0) {
      compassHeading += Math.PI;
    } else if (Vx < 0) {
      compassHeading += 2 * Math.PI;
    }

    return compassHeading * (180 / Math.PI); /*  度°によるコンパスの向き  */

  }

  // ジャイロスコープと地磁気をセンサーから取得
  judgeOrient(event: any): string {
    let absolute = event.absolute;
    let alpha = event.alpha;
    let beta = event.beta;
    let gamma = event.gamma;

    let degrees = this.compassHeading(alpha, beta, gamma);


    let direction = 'a';
    if (
      (degrees > 337.5 && degrees < 360) ||
      (degrees > 0 && degrees < 22.5)
    ) {
      direction = "北";
    } else if (degrees > 22.5 && degrees < 67.5) {
      direction = "北東";
    } else if (degrees > 67.5 && degrees < 112.5) {
      direction = "東";
    } else if (degrees > 112.5 && degrees < 157.5) {
      direction = "東南";
    } else if (degrees > 157.5 && degrees < 202.5) {
      direction = "南";
    } else if (degrees > 202.5 && degrees < 247.5) {
      direction = "南西";
    } else if (degrees > 247.5 && degrees < 292.5) {
      direction = "西";
    } else if (degrees > 292.5 && degrees < 337.5) {
      direction = "北西";
    }

    return direction;
  }
}
const deviceOrientationManager = new DeviceOrientationManager();

class JsonDataManager{
  constructor(){
    setInterval(() => {
      this.collectData();
      document.getElementById('jsonData')!.innerHTML = JSON.stringify(this.jsonData);
    }, 1000);
  }

  jsonData = {};
  collectData(): void {
    this.jsonData = {
      "GravitySensor" : {
        "x" : gravitySensorManager.x,
        "y" : gravitySensorManager.y,
        "z" : gravitySensorManager.z,

      }
    }
  }
}
const jsonDataManager = new JsonDataManager();