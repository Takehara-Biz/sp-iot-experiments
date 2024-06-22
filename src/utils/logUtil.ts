export class LogUtil {
  static info(jsonStr: string): void {
    //const date = new Date().toLocaleString();
    console.info("[ INFO] " + jsonStr.substring(0, 120) + "...");
  }
}