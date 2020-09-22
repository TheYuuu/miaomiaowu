import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';

// OrbitControls.install( { THREE: THREE } );

export class Drawer {

  constructor() {
    this.init();
    this.addEarth();
    this.addControls();
    this.render();
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x000, 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);

    this.webGLRenderer = webGLRenderer;
  }

  addEarth() {
    var sphere = this.createMesh(new THREE.SphereGeometry(10, 40, 40));

    this.sphere = sphere;
    this.scene.add(sphere);

    this.camera.position.x = -10;
    this.camera.position.y = 15;
    this.camera.position.z = 25;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  addControls() {
    var orbitControls = new OrbitControls(this.camera, this.webGLRenderer.domElement);
    orbitControls.autoRotate = false;
    this.orbitControls = orbitControls;

    this.clock = new THREE.Clock();

    var ambi = new THREE.AmbientLight(0x181818);
    this.scene.add(ambi);

    var spotLight = new THREE.DirectionalLight(0xffffff);
    spotLight.position.set(550, 100, 550);
    spotLight.intensity = 0.6;

    this.scene.add(spotLight);

    document.getElementById('WebGL-output').appendChild( this.webGLRenderer.domElement );

    var renderPass = new RenderPass(this.scene, this.camera);
    var effectFilm = new FilmPass(0.8, 0.325, 256, false);
    effectFilm.renderToScreen = true;

    var composer = new EffectComposer(this.webGLRenderer);
    composer.addPass(renderPass);
    composer.addPass(effectFilm);
    this.composer = composer; 
  }

  createMesh(geom) {
    var planetTexture = THREE.TextureLoader("../assets/textures/planets/Earth.png");
    var specularTexture = THREE.TextureLoader("../assets/textures/planets/EarthSpec.png");
    var normalTexture = THREE.TextureLoader("../assets/textures/planets/EarthNormal.png");


    var planetMaterial = new THREE.MeshPhongMaterial();
    planetMaterial.specularMap = specularTexture;
    planetMaterial.specular = new THREE.Color(0x4444aa);


    planetMaterial.normalMap = normalTexture;
    planetMaterial.map = planetTexture;

    var mesh = SceneUtils.createMultiMaterialObject(geom, [planetMaterial]);

    return mesh;
  }

  render() {
    //sphere.rotation.y=step+=0.01;
    var delta = this.clock.getDelta();
    this.orbitControls.update(delta);

    // this.sphere.rotation.y += 0.002;

    // render using requestAnimationFrame
    requestAnimationFrame(this.render.bind(this));
//            webGLRenderer.render(scene, camera);
    this.composer.render(delta);
}
}