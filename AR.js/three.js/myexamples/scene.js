function sceneDesign() {
  // add obstacles to the scene
  scene.obstacles = [];
  scene.obstacles.push ( new Obstacle (new THREE.Vector3(1.5,0,1.5), 0.1) )
  scene.obstacles.push ( new Obstacle (new THREE.Vector3(-0.5,0,1.5), 0.05) )
  scene.obstacles.push ( new Obstacle (new THREE.Vector3(0,0,-0.5), 0.075) )
  
}
function sceneTarget(){

	let n = new THREE.Vector3 (-2 + 4 * Math.random(),0,-2 + 4 * Math.random()); 
	  for(let j = 0;j<scene.obstacles.length;j++){
		  if(n.distanceTo(scene.obstacles[j].center) > scene.obstacles[j].size+0.2){
			  if(j>=2){
          scene.targets = new Target (1,new THREE.Vector3(n.x,0,n.z))
        }
		  }
		  else {
        n = new THREE.Vector3 (-2 + 4 * Math.random(),0,-2 + 4 * Math.random()); 
        j=0;
      }
	  }
	  
}
/*function sceneFromJSON () {
  const JSONStr = '{"obstacles":[{"center":{"x":209.52434509802094,"y":-1.584297207979961e-14,"z":71.3504031550267},"size":40},{"center":{"x":3.9594796502145093,"y":5.5165438176416846e-14,"z":263.55695318495896},"size":40},{"center":{"x":5.42098955335508,"y":3.5646388308083605e-14,"z":-160.53706110138933},"size":40},{"center":{"x":-208.14531121285557,"y":-1.780298028666322e-14,"z":80.17749538510077},"size":40},{"center":{"x":6.152290480954046,"y":-1.6335404928678994e-14,"z":73.56812354974488},"size":40}],"targets":[{"id":0,"pos":{"x":-170.96098270075498,"y":1.4072922348060594e-13,"z":-121.78807842739616}},{"id":1,"pos":{"x":173.8093284377129,"y":3.632627064004123e-14,"z":-163.5989789182495}},{"id":2,"pos":{"x":248.1273914134486,"y":5.516543817640233e-14,"z":263.5569531850243}},{"id":3,"pos":{"x":-237.81629357811414,"y":5.1244638502615395e-14,"z":281.21466513488554}}]}';
  
  let myScene = JSON.parse (JSONStr);
  
  scene.obstacles = []
  myScene.obstacles.forEach (function (obs) {
  	scene.obstacles.push (new Obstacle (new THREE.Vector3 (obs.center.x, obs.center.y, obs.center.z), 30))
  })
  
  scene.targets = []
  myScene.targets.forEach (function (tt) {
  	scene.targets.push (new Target (tt.id, new THREE.Vector3 (tt.pos.x, tt.pos.y, tt.pos.z) ))
  })

}*/