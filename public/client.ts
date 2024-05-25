// カメラ

let cur :MediaStream|null = null;

let setting = {
  audio: false,
  video: {
    //width: 100%,
    height: 300,
    facingMode: { exact: 'environment' },
    // facingMode: 'user',
  },
};

function videoStart() {
  videoStop();
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(setting).then((stream) => {
      document.getElementById('js-camera')!.innerHTML = '';
      const video = document.getElementById('video') as HTMLVideoElement;
      cur = stream;
      video!.srcObject = stream;
      video!.play();
    }).catch((e) => {
      document.getElementById('js-camera')!.innerHTML = 'Cannot use camera: ' + e;
      //$('.js-camera').html('Cannot use camera: ' + a);
    });
  }
}

function videoStop() {
  if (cur !== null) {
    cur.getVideoTracks().forEach((camera) => {
      camera.stop();
    });
    cur = null;
  }
}

function videoChangeCamera() {
  if (setting.video.facingMode.exact == 'user') {
    setting.video.facingMode.exact = 'environment';
  } else {
    setting.video.facingMode.exact = 'user';
  }
  if (cur !== null) {
    videoStop();
    videoStart();
  }
}

// 重力加速度センサー

let gravitySensor = new GravitySensor({ frequency: 6 });

gravitySensor.addEventListener("reading", (e) => {
  console.log(`X 軸方向の重力 ${gravitySensor.x}`);
  console.log(`Y 軸方向の重力 ${gravitySensor.y}`);
  console.log(`Z 軸方向の重力 ${gravitySensor.z}`);
  document.getElementById('gravityXSpan').innerHTML = gravitySensor.x;
  document.getElementById('gravityYSpan').innerHTML = gravitySensor.y;
  document.getElementById('gravityZSpan').innerHTML = gravitySensor.z;
});

gravitySensor.start();

// 加速度センサー

const acl = new Accelerometer({ frequency: 60 });
acl.addEventListener("reading", () => {
  console.log(`X 軸方向の加速度 ${acl.x}`);
  console.log(`Y 軸方向の加速度 ${acl.y}`);
  console.log(`Z 軸方向の加速度 ${acl.z}`);
  document.getElementById('accelerationXSpan').innerHTML = acl.x;
  document.getElementById('accelerationYSpan').innerHTML = acl.y;
  document.getElementById('accelerationZSpan').innerHTML = acl.z;
});

acl.start();