function onChangeCameraManagerCheckBox(event: any){
  if(event.target.checked){
    cameraManager.start();
    document.getElementById('changeCameraId')!.removeAttribute('disabled');
  } else {
    cameraManager.stop();
    document.getElementById('changeCameraId')!.setAttribute('disabled', 'true');
  }
}

function onChangeDeviceOrientationManagerCheckBox(event: any){
  if(event.target.checked){
    deviceOrientationManager.start();
  } else {
    deviceOrientationManager.stop();
  }
}

function onChangeGeolocationManagerCheckBox(event: any){
  if(event.target.checked){
    geolocationManager.start();
  } else {
    geolocationManager.stop();
  }
}

function onChangeGravitySensorManagerCheckBox(event: any){
  if(event.target.checked){
    gravitySensorManager.start();
  } else {
    gravitySensorManager.stop();
  }
}