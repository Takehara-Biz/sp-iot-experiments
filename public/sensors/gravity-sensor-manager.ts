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