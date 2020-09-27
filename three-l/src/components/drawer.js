import * as THREE from 'three';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
import {
  SceneUtils
} from 'three/examples/jsm/utils/SceneUtils.js';

export class Drawer {

  constructor(dom) {
    this.init(dom);
    this.addEarth();
    this.addLight();
    this.addGalaxy();
    this.addControls();
    this.showAxes();
    this.render();
  }

  init(dom) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.x = 10;
    this.camera.position.y = 15;
    this.camera.position.z = 30;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.webGLRenderer = new THREE.WebGLRenderer();
    this.webGLRenderer.setClearColor(0x000, 1.0);
    this.webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById(dom).appendChild(this.webGLRenderer.domElement);

    this.textureLoader = new THREE.TextureLoader();
  }

  addEarth() {
    const sphere = this.createMesh(new THREE.SphereGeometry(10, 40, 40));

    this.sphere = sphere;
    this.scene.add(sphere);
  }

  createMesh(geom) {
    const textureLoader = this.textureLoader;
    const map = textureLoader.load(require('../assets/textures/planets/Earth.png'));
    const bumpMap = textureLoader.load(require('../assets/textures/planets/earthbump1k.jpg'));
    const specularMap = textureLoader.load(require('../assets/textures/planets/EarthSpec.png'));

    const material = new THREE.MeshPhongMaterial({
      bumpScale: 0.05,
      specular: new THREE.Color('grey'),
      shininess: 10
    });

    material.map = map;
    material.bumpMap = bumpMap;
    material.specularMap = specularMap;

    return new THREE.Mesh(geom, material);;
  }

  addLight() {
    const ambi = new THREE.AmbientLight('grey');
    this.scene.add(ambi);

    const spotLight = new THREE.SpotLight(0xffffff, 1, 0, 10, 2);
    spotLight.position.set(350, 350, 150);
    spotLight.intensity = 0.3;

    this.scene.add(spotLight);
  }

  addGalaxy() {
    const galaxyGeometry = new THREE.SphereGeometry(100, 32, 32);
    const galaxyMaterial = new THREE.MeshBasicMaterial({
      side: THREE.BackSide
    });
    const galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);

    galaxyMaterial.map = this.textureLoader.load(require('../assets/textures/planets/starfield.png'));
    this.scene.add(galaxy);
  }

  addControls() {
    this.orbitControls = new OrbitControls(this.camera, this.webGLRenderer.domElement);
    this.orbitControls.autoRotate = false;

    this.clock = new THREE.Clock();
  }

  showAxes() {
    var axes = new THREE.AxisHelper(300);
    this.scene.add(axes);
  }

  render() {
    var delta = this.clock.getDelta();
    this.orbitControls.update(delta);

    this.sphere.rotation.y += 0.002;

    requestAnimationFrame(this.render.bind(this));
    this.webGLRenderer.render(this.scene, this.camera);
  }
}