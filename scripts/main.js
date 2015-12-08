// var player = require("pano.js");
import PanoPlayer from './PanoPlayer.js';

var player = new PanoPlayer("http://182.92.4.139:1935/vod/mp4:sample.mp4/manifest.mpd");
window.player = player;

document.body.addEventListener('click',function(){
    player.video.play();
}.bind(this),false);

function animate(timestamp) {
  //var video = player.getVideo();
  if (player.video.readyState === player.video.HAVE_ENOUGH_DATA) {
    if (player.videoTexture) {
      player.videoTexture.needsUpdate = true;
    } else {
      console.log("No video texture!!");
    }
    // Update VR headset position and apply to camera.
    player.controls.update();

    // Render the scene through the manager.
    player.manager.render(player.scene, player.camera, timestamp);
  }

  requestAnimationFrame(animate);
}

animate();
