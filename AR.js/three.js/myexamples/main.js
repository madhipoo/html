/////////////////////////////////////////////////////////
// global variables
var camera, renderer;
var agent1,agent2;
var arToolkitSource,arToolKitContext;
var smoothedControls,markerRoot,smoothedRoot;
// program starts here ...
init();
animate();

function onResize(){
	arToolkitSource.onResize()	
	arToolkitSource.copySizeTo(renderer.domElement)	
	if( arToolkitContext.arController !== null ){
		arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)	
	}	
}

function init() {
    renderer	= new THREE.WebGLRenderer({
		// antialias	: true,
		alpha: true
	});
	renderer.setClearColor(new THREE.Color('lightgrey'), 0)
	// renderer.setPixelRatio( 1/2 );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.style.position = 'absolute'
	renderer.domElement.style.top = '0px'
	renderer.domElement.style.left = '0px'
  	document.body.appendChild( renderer.domElement );

  	initThree();//scene = new THREE.Scene();

	camera = new THREE.Camera();
	scene.add(camera);

    arToolkitSource = new THREEx.ArToolkitSource({
		// to read from the webcam 
		sourceType : 'webcam',		
	})

	arToolkitSource.init(function onReady(){
		onResize()
	})
	
	// handle resize
	window.addEventListener('resize', function(){
		onResize()
  	})
  //          initialize arToolkitContext

	// create atToolkitContext
	arToolkitContext = new THREEx.ArToolkitContext({
		cameraParametersUrl: THREEx.ArToolkitContext.baseURL + '../data/data/camera_para.dat',
		detectionMode: 'mono',
		maxDetectionRate: 30,
		canvasWidth: 80*3,
		canvasHeight: 60*3,
	})
	// initialize it
	arToolkitContext.init(function onCompleted(){
		// copy projection matrix to camera
		camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
  	})
  
  	//          Create a ArMarkerControls
	markerRoot = new THREE.Group
	scene.add(markerRoot)
	var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
		type : 'pattern',
		patternUrl : THREEx.ArToolkitContext.baseURL + '../AR.js/data/data/patt.hiro'
		// patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji'
	})

	// build a smoothedControls
	smoothedRoot = new THREE.Group()
	scene.add(smoothedRoot)
	
	smoothedControls = new THREEx.ArSmoothedControls(smoothedRoot, {
		lerpPosition: 0.4,
		lerpQuaternion: 0.3,
		lerpScale: 1,
  	})
	////////
	let MAXSPEED1 = 200; // halfsize of agent
	agent1 = new Agent(new THREE.Vector3(-400 + 400 * Math.random(), 0, -400 + 400 * Math.random()), MAXSPEED1);
	let MAXSPEED2 = 300; // halfsize of agent
	agent2 = new Agent(new THREE.Vector3(-400 + 400 * Math.random(), 0, -400 + 400 * Math.random()), MAXSPEED2);
	//agent = new Agent(new THREE.Vector3(50,0,-50), size);	


	stats = new Stats();
	document.body.appendChild( stats.dom );

  	// scene grid [-400,400]x[-400,400]
	//var gridXZ = new THREE.GridHelper(800, 80, 'red', 'white');
	//scene.add(gridXZ);

  	// in scene.js
	sceneDesign();
	sceneTarget();
  	//sceneFromJSON ( );  // using LevelDesigner
  //////////////////////////////////////////////////////////////////////////	
  

}

function animate() {
  
  agent1.update(0.01);
  agent2.update(0.01);

  // check agent crossing obstacles ...
  if( arToolkitSource.ready === false )	return
	arToolkitContext.update( arToolkitSource.domElement )

  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}

