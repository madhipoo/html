class Target {
	constructor (test, pos) {
		this.test = test;
		this.pos = pos;
		this.id = 1;
		this.mesh = new THREE.Mesh (new THREE.CylinderGeometry (0.02,0.02,0.01,20), 
		    new THREE.MeshBasicMaterial ({color:'yellow'}));
		this.mesh.position.copy (pos)
		arWorldRoot.add (this.mesh);
	}
	/*setFound (agent) {
		// remove from scene.targets
		scene.remove(this.mesh);
	}*/
	
}
