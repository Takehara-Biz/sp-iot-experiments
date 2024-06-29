// 加速度センサー
class AccelerometerManager {

  x: number = 0;
  y: number = 0;
  z: number = 0;
  accelerometer: Accelerometer;
  isRecording: boolean = false;

  constructor() {
    this.accelerometer = new Accelerometer({ frequency: 1 });
    this.accelerometer.addEventListener("reading", () => {
      console.log(`X 軸方向の加速度 ${this.accelerometer.x}`);
      console.log(`Y 軸方向の加速度 ${this.accelerometer.y}`);
      console.log(`Z 軸方向の加速度 ${this.accelerometer.z}`);
      document.getElementById('accelerationXSpan')!.innerHTML = '' + this.accelerometer.x;
      document.getElementById('accelerationYSpan')!.innerHTML = '' + this.accelerometer.y;
      document.getElementById('accelerationZSpan')!.innerHTML = '' + this.accelerometer.z;
      this.x = this.accelerometer.x!;
      this.y = this.accelerometer.y!;
      this.z = this.accelerometer.z!;
    });
  }

  start(){
    this.accelerometer.start();
    this.isRecording = true;
  }

  stop(){
    this.isRecording = false;
    this.accelerometer.stop();
    this.x = 0;
    this.y = 0;
    this.z = 0;
    document.getElementById('accelerationXSpan')!.innerHTML = '' + 0;
    document.getElementById('accelerationYSpan')!.innerHTML = '' + 0;
    document.getElementById('accelerationZSpan')!.innerHTML = '' + 0;
  }
}