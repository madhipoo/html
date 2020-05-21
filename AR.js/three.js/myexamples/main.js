
var renderer	= new THREE.WebGLRenderer({
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


var onRenderFcts= [];

// init scene and camera
var scene	= new THREE.Scene();

// Create a camera
var camera = new THREE.Camera();
scene.add(camera);


var arToolkitSource = new THREEx.ArToolkitSource({
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
function onResize(){
	arToolkitSource.onResize()	
	arToolkitSource.copySizeTo(renderer.domElement)	
	if( arToolkitContext.arController !== null ){
		arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)	
	}	
	//renderer.setSize (window.innerWidth, window.innerHeight)
}

// create atToolkitContext
var arToolkitContext = new THREEx.ArToolkitContext({
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

// update artoolkit on every frame
onRenderFcts.push(function(){
	if( arToolkitSource.ready === false )	return

	arToolkitContext.update( arToolkitSource.domElement )
})

var markerRoot = new THREE.Group
scene.add(markerRoot)
var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
	type : 'pattern',
	patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.hiro'
	// patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji'
})

// build a smoothedControls
var smoothedRoot = new THREE.Group()
scene.add(smoothedRoot)
var smoothedControls = new THREEx.ArSmoothedControls(smoothedRoot, {
	lerpPosition: 0.4,
	lerpQuaternion: 0.3,
	lerpScale: 1,
})
onRenderFcts.push(function(delta){
	smoothedControls.update(markerRoot)
})
var arWorldRoot = smoothedRoot

// add a torus knot	

let MAXSPEED1 = 1; // halfsize of agent
let a1 = new THREE.Vector3 (-1 + 2 * Math.random(),0,-1 + 2 * Math.random()); 
let a2 = new THREE.Vector3 (-1 + 2 * Math.random(),0,-1 + 2 * Math.random()); 
for(let j = 0;j<scene.obstacles.length;j++){
	if(a1.distanceTo(scene.obstacles[j].center) > scene.obstacles[j].size+0.05){
		if(j>=2){
			vec1 = new Target (1,new THREE.Vector3(a1.x,0,a1.z))
		}
	}
	else {
		a1 = new THREE.Vector3 (-1 + 2 * Math.random(),0,-1 + 2 * Math.random()); 
		j=0;
	}
	if(a2.distanceTo(scene.obstacles[j].center) > scene.obstacles[j].size+0.05){
		if(j>=2){
			vec2 = new Target (1,new THREE.Vector3(a2.x,0,a2.z))
		}
	}
	else {
		a2 = new THREE.Vector3 (-1 + 2 * Math.random(),0,-1 + 2 * Math.random()); 
		j=0;
	}
}
var agent1 = new Agent(new THREE.Vector3(vec1.x, 0, vec1.z), MAXSPEED1);
arWorldRoot.add(agent1.mesh);
let MAXSPEED2 = 2; // halfsize of agent
var agent2 = new Agent(new THREE.Vector3(vec2.x, 0, vec2.z), MAXSPEED2);
arWorldRoot.add(agent2.mesh);
//agent = new Agent(new THREE.Vector3(50,0,-50), size);	
// in scene.js
sceneDesign();
sceneTarget();
//sceneFromJSON ( );  // using LevelDesigner

//////////////////////////////////////////////////////////////////////////////////
//		render the whole thing on the page
//////////////////////////////////////////////////////////////////////////////////
var stats = new Stats();
document.body.appendChild( stats.dom );
// render the scene
onRenderFcts.push(function(){
	renderer.render( scene, camera );
	stats.update();
})

// run the rendering loop
var lastTimeMsec= null
requestAnimationFrame(function animate(nowMsec){
	// keep looping
	requestAnimationFrame( animate );
	// measure time
	lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
	var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
	lastTimeMsec	= nowMsec
	// call each update function
	///
	agent1.update(0.01);
	agent2.update(0.01);
	///
	onRenderFcts.forEach(function(onRenderFct){
		onRenderFct(deltaMsec/1000, nowMsec/1000)
	})
})
