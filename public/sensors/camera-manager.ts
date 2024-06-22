class CameraManager implements ManagerInterface {
  private static TAKE_SNAPSHOT_INTERVAL_MS = 500;

  isRecording: boolean = false;
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
  private intervalId: NodeJS.Timeout | undefined;

  start() {
    this.stop();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(this.setting).then((stream) => {
        document.getElementById('js-camera')!.innerHTML = '';
        const video = document.getElementById('video') as HTMLVideoElement;
        this.mediaStream = stream;
        video!.srcObject = stream;
        video!.play();
        this.intervalId = setInterval(() => {
          const video = document.getElementById('video')! as HTMLVideoElement;
          const canvas = document.getElementById('snapShotCanvas')! as HTMLCanvasElement;
          canvas.getContext('2d')!.drawImage(video, 0, 0, canvas.width, canvas.height);
          const snapShotBase64TextArea = document.getElementById('snapShotBase64')! as HTMLInputElement;
          snapShotBase64TextArea.innerText = canvas.toDataURL();
          this.snapShotBase64 = canvas.toDataURL();
        }, CameraManager.TAKE_SNAPSHOT_INTERVAL_MS);
        this.isRecording = true;
      }).catch((e) => {
        this.isRecording = false;
        document.getElementById('js-camera')!.innerHTML = 'Cannot use camera: ' + e;
        alert('Cannot use camera: ' + e);
        //$('.js-camera').html('Cannot use camera: ' + a);
      });
      
    } else {
      alert('Your device does not support camera!');
      this.isRecording = false;
    }
  }

  stop() {
    this.isRecording = false;
    if (this.mediaStream !== null) {
      this.mediaStream.getVideoTracks().forEach((camera) => {
        camera.stop();
      });
      this.mediaStream = null;
    }
    clearInterval(this.intervalId);
    
    const canvas = document.getElementById('snapShotCanvas')! as HTMLCanvasElement;
    canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('snapShotBase64')!.innerText = '';
  }

  videoChangeCamera() {
    if (this.setting.video.facingMode.exact == 'user') {
      this.setting.video.facingMode.exact = 'environment';
    } else {
      this.setting.video.facingMode.exact = 'user';
    }
    if (this.mediaStream !== null) {
      this.stop();
      this.start();
    }
  }
}