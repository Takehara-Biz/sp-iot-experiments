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