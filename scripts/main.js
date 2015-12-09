// var player = require("pano.js");
import PanoPlayer from './PanoPlayer.js';

// var url = "http://182.92.4.139:1935/vod/mp4:sample.mp4/manifest.mpd";
// var url = "http://192.168.31.105/~halo/pano-video-player/videos/playlist.m3u8";
var url = "http://192.168.31.105/~halo/pano-video-player/videos/sample.mp4";
var appendRender = function(renderer){
  document.body.appendChild(renderer.domElement);
}

// var player = new PanoPlayer(url, appendRender.bind(this));
var player = new PanoPlayer(url, appendRender);
window.player = player;

document.body.addEventListener('click',function(){
    player.video.play();
    // animate();
}.bind(this),false);

function animate(timestamp) {
  //var video = player.getVideo();
  if (player.video.readyState != 0 ) {
    if (player.videoTexture) {
      player.videoTexture.needsUpdate = true;
      // Update VR headset position and apply to camera.
      player.controls.update();

      // Render the scene through the manager.
      player.manager.render(player.scene, player.camera, timestamp);
    }
  }

  requestAnimationFrame(animate);
}

animate();
