this.isReady = false;
this.video = document.getElementById('video');
this._url = url || "";
this.initSource(this.video,"");

// this.cb = cb;
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

document.body.addEventListener('click',function(){
  this.video.play();
},false);

//this.cb(this.renderer);
document.body.appendChild(this.renderer.domElement);
this.video.addEventListener('Loaded', function() {
  this.isReady = true;
}, false)

animate(timestamp) {
  //if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
  if (this.isReady)
    if (this.videoTexture) {
      this.videoTexture.needsUpdate = true;
    } else {
      console.log("No video texture!!");
    }
    // Update VR headset position and apply to camera.
    this.controls.update();

    // Render the scene through the manager.
    this.manager.render(this.scene, this.camera, timestamp);
  }

  requestAnimationFrame(animate);
}

animate();
