class CameraManager {

  private mediaStream: MediaStream | null = null;
  private setting = {
    audio: false,
    video: {
      width: 100,
      height: 100,
      facingMode: { exact: 'environment' },
      // facingMode: 'user',
    },
  };

  public snapShotBase64 = ""

  constructor() {
    setInterval(() => {
      const video = document.getElementById('video')! as HTMLVideoElement;
      const canvas = document.getElementById('snapShotCanvas')! as HTMLCanvasElement;
      canvas.getContext('2d')!.drawImage(video, 0, 0, canvas.width, canvas.height);
      const snapShotBase64TextArea = document.getElementById('snapShotBase64')! as HTMLInputElement;
      snapShotBase64TextArea.innerText = canvas.toDataURL();
      this.snapShotBase64 = canvas.toDataURL();
    }, 2000);
  }

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