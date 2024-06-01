class GeolocationManager {
  lat: number = 0.0;
  lng: number = 0.0;
  constructor() {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          document.getElementById('positionLatSpan')!.innerText = '' + this.lat;
          document.getElementById('positionLngSpan')!.innerText = '' + this.lng;
        });
      }, 3000);
    } else {
      /* geolocation IS NOT available */
    }
  }
}