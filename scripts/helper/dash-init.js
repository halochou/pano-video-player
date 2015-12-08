// ------------------DASH---------------------------------------
function initPlayer(video){
  // Install polyfills.
  shaka.polyfill.installAll();

  // Construct a Player to wrap around it.
  var player = new shaka.player.Player(video);

  // Attach the player to the window so that it can be easily debugged.
  window.player = player;

  // Listen for errors from the Player.
  player.addEventListener('error', function(event) {
    console.error(event);
  });

  // Construct a DashVideoSource to represent the DASH manifest.
  var mpdUrl = 'http://182.92.4.139:1935/live/pano/manifest.mpd';
  var estimator = new shaka.util.EWMABandwidthEstimator();
  var source = new shaka.player.DashVideoSource(mpdUrl, null, estimator);

  // Load the source into the Player.
  player.load(source);
}

initPlayer(video);
