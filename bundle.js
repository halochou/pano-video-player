/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _PanoPlayer = __webpack_require__(1);
	
	var _PanoPlayer2 = _interopRequireDefault(_PanoPlayer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var player = new _PanoPlayer2.default("http://182.92.4.139:1935/vod/mp4:sample.mp4/manifest.mpd"); // var player = require("pano.js");
	
	window.player = player;
	
	document.body.addEventListener('click', (function () {
	  player.video.play();
	}).bind(undefined), false);
	
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PanoPlayer = (function () {
	    function PanoPlayer(url) {
	        _classCallCheck(this, PanoPlayer);
	
	        this.video = document.createElement('video');
	
	        this._url = url || "";
	        this.initSource();
	    }
	
	    _createClass(PanoPlayer, [{
	        key: 'initSource',
	        value: function initSource() {
	            //var video = this._video;
	            // Install polyfills.
	            shaka.polyfill.installAll();
	
	            // Construct a Player to wrap around it.
	            this._shakaPlayer = new shaka.player.Player(this.video);
	
	            // Listen for errors from the Player.
	            this._shakaPlayer.addEventListener('error', function (event) {
	                console.error(event);
	            });
	
	            // Construct a DashVideoSource to represent the DASH manifest.
	            var mpdUrl = this._url;
	            var estimator = new shaka.util.EWMABandwidthEstimator();
	            var source = new shaka.player.DashVideoSource(mpdUrl, null, estimator);
	
	            // Load the source into the Player.
	            this._shakaPlayer.load(source).then(this.initThree.bind(this));
	        }
	    }, {
	        key: 'initThree',
	        value: function initThree() {
	            // this.cb = cb;
	            this.renderer = new THREE.WebGLRenderer({ antialias: false });
	            this.renderer.setPixelRatio(window.devicePixelRatio);
	            this.scene = new THREE.Scene();
	            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
	            this.controls = new THREE.VRControls(this.camera);
	
	            this.effect = new THREE.VREffect(this.renderer);
	            this.effect.setSize(window.innerWidth, window.innerHeight);
	
	            this.manager = new WebVRManager(this.renderer, this.effect, { hideButton: false });
	
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
	
	            document.body.appendChild(this.renderer.domElement);
	        }
	        // ------------------DASH---------------------------------------
	
	    }]);
	
	    return PanoPlayer;
	})();
	
	// module.exports = PanoPlayer;
	
	exports.default = PanoPlayer;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map