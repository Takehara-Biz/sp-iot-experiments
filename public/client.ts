function onChangeGravitySensorManagerCheckBox(event: any){
  if(event.target.checked){
    gravitySensorManager.start();
  } else {
    gravitySensorManager.stop();
  }
}