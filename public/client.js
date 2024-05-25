// カメラ
var cur = null;
var setting = {
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
        navigator.mediaDevices.getUserMedia(setting).then(function (stream) {
            document.getElementById('js-camera').innerHTML = '';
            var video = document.getElementById('video');
            cur = stream;
            video.srcObject = stream;
            video.play();
        }).catch(function (e) {
            document.getElementById('js-camera').innerHTML = 'Cannot use camera: ' + e;
            //$('.js-camera').html('Cannot use camera: ' + a);
        });
    }
}
function videoStop() {
    if (cur !== null) {
        cur.getVideoTracks().forEach(function (camera) {
            camera.stop();
        });
        cur = null;
    }
}
function videoChangeCamera() {
    if (setting.video.facingMode.exact == 'user') {
        setting.video.facingMode.exact = 'environment';
    }
    else {
        setting.video.facingMode.exact = 'user';
    }
    if (cur !== null) {
        videoStop();
        videoStart();
    }
}
// 重力加速度センサー
var gravitySensor = new GravitySensor({ frequency: 6 });
gravitySensor.addEventListener("reading", function (e) {
    console.log("X \u8EF8\u65B9\u5411\u306E\u91CD\u529B ".concat(gravitySensor.x));
    console.log("Y \u8EF8\u65B9\u5411\u306E\u91CD\u529B ".concat(gravitySensor.y));
    console.log("Z \u8EF8\u65B9\u5411\u306E\u91CD\u529B ".concat(gravitySensor.z));
    document.getElementById('gravityXSpan').innerHTML = gravitySensor.x;
    document.getElementById('gravityYSpan').innerHTML = gravitySensor.y;
    document.getElementById('gravityZSpan').innerHTML = gravitySensor.z;
});
gravitySensor.start();
// 加速度センサー
var acl = new Accelerometer({ frequency: 60 });
acl.addEventListener("reading", function () {
    console.log("X \u8EF8\u65B9\u5411\u306E\u52A0\u901F\u5EA6 ".concat(acl.x));
    console.log("Y \u8EF8\u65B9\u5411\u306E\u52A0\u901F\u5EA6 ".concat(acl.y));
    console.log("Z \u8EF8\u65B9\u5411\u306E\u52A0\u901F\u5EA6 ".concat(acl.z));
    document.getElementById('accelerationXSpan').innerHTML = acl.x;
    document.getElementById('accelerationYSpan').innerHTML = acl.y;
    document.getElementById('accelerationZSpan').innerHTML = acl.z;
});
acl.start();
