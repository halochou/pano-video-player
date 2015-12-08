// var player = require("pano.js");
import PanoPlayer from './PanoPlayer.js';

var url = "http://182.92.4.139:1935/vod/mp4:sample.mp4/manifest.mpd";
var player = new PanoPlayer(url, function(renderer){
  //document.body.appendChild(renderer.domElement);
  var appDiv = document.getElementById('app');
  appDiv.appendChild(renderer.domElement);
}.bind(this));
window.player = player;

document.body.addEventListener('click',function(){
    player.video.play();
}.bind(this),false);

function animate(timestamp) {
  //var video = player.getVideo();
  if (player.video.readyState != 0 ) {
    if (player.videoTexture) {
      player.videoTexture.needsUpdate = true;
    }
    // Update VR headset position and apply to camera.
    player.controls.update();

    // Render the scene through the manager.
    player.manager.render(player.scene, player.camera, timestamp);
  }

  requestAnimationFrame(animate);
}

animate();
