// 重力加速度センサー
class GravitySensorManager implements ManagerInterface{
  private gravitySensor = new GravitySensor({ frequency: 1 });
  isRecording: boolean = false;
  x: number = 0;
  y: number = 0;
  z: number = 0;

  constructor() {
    this.gravitySensor = new GravitySensor({ frequency: 1 });
    this.gravitySensor.addEventListener("reading", (_e: Event) => {
      document.getElementById('gravityXSpan')!.innerHTML = '' + this.gravitySensor.x;
      document.getElementById('gravityYSpan')!.innerHTML = '' + this.gravitySensor.y;
      document.getElementById('gravityZSpan')!.innerHTML = '' + this.gravitySensor.z;
      this.x = this.gravitySensor.x!;
      this.y = this.gravitySensor.y!;
      this.z = this.gravitySensor.z!;
    });
    this.isRecording = false;
  }

  start(){
    this.gravitySensor.start();
    this.isRecording = true;
  }

  stop(){
    this.gravitySensor.stop();
    this.isRecording = false;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    document.getElementById('gravityXSpan')!.innerHTML = '' + 0;
    document.getElementById('gravityYSpan')!.innerHTML = '' + 0;
    document.getElementById('gravityZSpan')!.innerHTML = '' + 0;
  }
}