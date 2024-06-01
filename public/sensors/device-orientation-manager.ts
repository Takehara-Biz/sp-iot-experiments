// コンパス（方位）

class DeviceOrientationManager {

  constructor() {
    window.addEventListener("deviceorientationabsolute", (event: DeviceOrientationEvent) => {
      if (new Date().getTime() < this.lastEventDateTime + 1000) {
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