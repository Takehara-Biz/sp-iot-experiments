window.onload = (() => {
  setInterval(() => {
    fetch('/sensor-data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (response: Response) => {
      const jsonData = await response.json();
      console.log('response! ' + jsonData);

      document.getElementById('latestUploadedSensorData')!.innerText = JSON.stringify(JSON.parse(jsonData), null, 2);
      const jsonData2 = JSON.parse(jsonData);
      const image = document.getElementById('latestCameraSnapShot')! as HTMLImageElement;
      image.src = jsonData2["cameraSnapShotBase64"];
    }).catch((error) => {
      console.error('error! ' + error);
    });
  }, 500);
});