 var windowWidth = window.innerWidth, windowHeight = window.innerHeight;
 var camera,renderer,scene;
 window.onload = function (){
    console.log("onload");
    Init();
    animate();
 };

function Init(){
        scene = new THREE.Scene();
  
       //setup camera
        camera = new LeiaCamera({
           cameraPosition:new THREE.Vector3(_camPosition.x, _camPosition.y, _camPosition.z), 
		   targetPosition: new THREE.Vector3(_tarPosition.x, _tarPosition.y, _tarPosition.z)
        });
        scene.add(camera);
 
  
       //setup rendering parameter
 		renderer = new LeiaWebGLRenderer({
         antialias:true, 
 		renderMode: _renderMode, 
		shaderMode: _nShaderMode,
		colorMode : _colorMode,
		devicePixelRatio: 1 
        } );
 		renderer.Leia_setSize( windowWidth, windowHeight );
 		document.body.appendChild( renderer.domElement );
  
       //add object to Scene
        addObjectsToScene();
  
        //add Light
 		addLights();
  
        //add Gyro Monitor
        //addGyroMonitor();
 }

 function animate() 
 {
 	requestAnimationFrame( animate );
    renderer.setClearColor(new THREE.Color().setRGB(1.0, 1.0, 1.0)); 
	renderer.Leia_render({
     scene:scene, 
     camera:camera,
     holoScreenSize:_holoScreenSize,
     holoCamFov:_camFov,
      upclip: _up,
     downclip:  _down,
     messageFlag:_messageFlag
   });
 }

function addObjectsToScene(){
    //Add your objects here
    var graph = new THREE.Mesh(new THREE.SphereGeometry(8, 30, 10), new   THREE.MeshLambertMaterial({color:0xffffff}));
	  scene.add(graph);
}

function addLights(){
    //Add Lights Here
    var xl = new THREE.DirectionalLight( 0x555555 );
 	xl.position.set( 1, 0, 2 );
 	scene.add( xl );
 	var pl = new THREE.PointLight(0x111111);
 	pl.position.set(-20, 10, 20);
 	scene.add(pl);
 	var ambientLight = new THREE.AmbientLight(0x111111);	
 	scene.add(ambientLight);
}