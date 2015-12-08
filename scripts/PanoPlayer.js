class PanoPlayer {
    constructor(url, done) {
        this.video = document.createElement('video');

        this._url = url || "";
        this.initDashSource();
        this.done = done;
    }

    initDashSource(){
      // Install polyfills.
      //shaka.polyfill.installAll();
      shaka.polyfill.CustomEvent.install();
      shaka.polyfill.MediaKeys.install();
      shaka.polyfill.Promise.install();
      shaka.polyfill.VideoPlaybackQuality.install();

      // Construct a Player to wrap around it.
      this._shakaPlayer = new shaka.player.Player(this.video);

      // Listen for errors from the Player.
      this._shakaPlayer.addEventListener('error', function(event) {
        console.error(event);
      });

      // Construct a DashVideoSource to represent the DASH manifest.
      var mpdUrl = this._url;
      var estimator = new shaka.util.EWMABandwidthEstimator();
      var source = new shaka.player.DashVideoSource(mpdUrl, null, estimator);

      // Load the source into the Player.
      this._shakaPlayer.load(source).then(this.initThree.bind(this));
    }

    initThree(){
        this.renderer = new THREE.WebGLRenderer({antialias: false});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.controls = new THREE.VRControls(this.camera);

        this.effect = new THREE.VREffect(this.renderer);
        this.effect.setSize(window.innerWidth, window.innerHeight);

        this.manager = new WebVRManager(this.renderer, this.effect, {hideButton: false});

        // Video texture
        this.videoTexture = new THREE.Texture(this.video);
        this.videoTexture.generateMipmaps = false;
        this.videoTexture.minFilter = THREE.LinearFilter;
        this.videoTexture.magFilter = THREE.LinearFilter;
        this.videoTexture.format = THREE.RGBFormat;

        // Sphere to render video
        this.sphere = new THREE.Mesh(new THREE.SphereGeometry(500, 80, 50), new THREE.MeshBasicMaterial({ map: this.videoTexture }));
        this.sphere.scale.x = -1;
        this.scene.add(this.sphere);

        this.done(this.renderer);
    }
}

// module.exports = PanoPlayer;
export default PanoPlayer;
