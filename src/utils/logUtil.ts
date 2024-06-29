export class LogUtil {
  static simplifyJsonForLogging(jsonData: any): string{
    const clone = structuredClone(jsonData);
    if(clone.cameraSnapShotBase64) {
      clone.cameraSnapShotBase64 = "(omitted for logging)";
    }
    return JSON.stringify(clone);
  }
  static debug(message: string): void {
    console.debug("[DEBUG] " + message);
  }
  static info(message: string): void {
    //const date = new Date().toLocaleString();
    console.info("[ INFO] " + message);
  }
}