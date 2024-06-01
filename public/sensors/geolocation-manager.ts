class GeolocationManager implements ManagerInterface{
  lat: number = 0.0;
  lng: number = 0.0;
  isRecording = false;
  private intervalId: NodeJS.Timeout | undefined;
  start() {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      this.intervalId = setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          document.getElementById('positionLatSpan')!.innerText = '' + this.lat;
          document.getElementById('positionLngSpan')!.innerText = '' + this.lng;
        });
      }, 3000);
      this.isRecording = true;
    } else {
      alert('geolocation IS NOT available in your device! ');
      this.isRecording = false;
    }
  }

  stop(){
    this.isRecording = false;
    clearInterval(this.intervalId);
  }
}