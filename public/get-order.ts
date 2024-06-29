/**
 * It's better to use WebSocket instead of polling.
 */
class GetOrderManager {
  constructor() {
    setInterval(() => {
      fetch('/order', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async (response: Response) => {
        const jsonStr = await response.json();
        
        if(jsonStr !== null){
          console.log('response! ' + jsonStr);
          const jsonData = JSON.parse(jsonStr);
          document.getElementById('get-order')!.innerHTML = JSON.stringify(JSON.parse(jsonStr), null, 2);
          document.getElementById('output')!.innerHTML = jsonData["printString"];
          const audioTag = document.getElementById("audioTagId")! as HTMLAudioElement;
          if(jsonData["soundFileString"] === "no-sound"){
            audioTag.src = "";
          } else {
            audioTag.src = "/sounds/" + jsonData["soundFileString"] + ".mp3";
          }
          if(jsonData["vibrateFlag"] === "on"){
            vibrationManager.vibrate();
          }
        }
        
      }).catch((error) => {
        console.error('error! ' + error);
      });
    }, 1000);
    console.info('start getting next order per 1 sec.');
  }
}
const getOrderManager = new GetOrderManager();