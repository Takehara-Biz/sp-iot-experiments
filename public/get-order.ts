class GetOrderManager {
  constructor() {
    setInterval(() => {
      fetch('/order', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async (response: Response) => {
        const jsonData = await response.json();
        
        if(jsonData !== null){
          console.log('response! ' + jsonData);
          document.getElementById('get-order')!.innerHTML = jsonData
          const jsonData2 = JSON.parse(jsonData);
          //console.log('response2! ' + jsonData2);
          document.getElementById('output')!.innerHTML = jsonData2["printString"];
          if(jsonData2["vibrateFlag"] === "on"){
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