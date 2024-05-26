class DisplayManager {
  replace(){
    document.getElementById('output')!.innerHTML = "あああ";
  }
}
const displayManager = new DisplayManager();

class VibrationManager {
  vibrate(): void{
    navigator.vibrate([500, 250, 500]);
  }
}
const vibrationManager = new VibrationManager();

class AudioManager {
  ready(){
    const source = document.getElementById('audioSource')! as HTMLSourceElement;
    source.src = sampleAudioSrc;
    console.log("aa! " + source.src);
  }
}
const audioManager = new AudioManager();

window.onload = (() => {
  audioManager.ready();
})