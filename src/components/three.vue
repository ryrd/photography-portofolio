<script setup lang="ts">
import { ref, onMounted, Renderer } from 'vue';
import { AmbientLight, DirectionalLightHelper, RectAreaLight, Raycaster, PlaneGeometry, BackSide,BoxGeometry, CubeCamera, CircleGeometry, Color as TColor, DirectionalLight, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, Scene, SphereGeometry, Vector2, WebGLRenderer, Light} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import {GUI} from 'dat.gui'

const canvasRef = ref()

let scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer, controls: any, composer: any

const gui = new GUI()

scene = new Scene()
// scene.background = new TColor(0x555555)

camera = new PerspectiveCamera(63, window.innerWidth/window.innerHeight, 1, 10000)

// const directionalLight = new DirectionalLight(0x66a5ff, 0)
// directionalLight.position.set(0,0,-5)
// scene.add(directionalLight)
// const helper = new DirectionalLightHelper(directionalLight);
// gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.1)
// gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.1)
// gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.1)
// scene.add( helper );
// const ambientLight = new AmbientLight(0x66a5ff, 1)
// scene.add(ambientLight)

const loader = new GLTFLoader()
loader.load('/boy.glb', (gltf: any) => {
    const obj = gltf.scene
    obj.position.set(0,-1,-3)
    obj.rotation.set(0, 80, 0)

    scene.add(gltf.scene)
    renderer.render(scene, camera)
    
    animate()
})

const boxgeometry = new BoxGeometry( 200, 300, 1 )
const boxmaterial = new MeshBasicMaterial({color: 0x66a5ff})
const cube = new Mesh( boxgeometry, boxmaterial )
cube.position.set(0, 100, -600)
scene.add(cube)

const mirrorGeometry = new PlaneGeometry(3000, 5000)
const mirror = new Reflector(mirrorGeometry, {
  textureWidth : window.innerWidth*window.devicePixelRatio, 
  textureHeight : window.innerHeight*window.devicePixelRatio,
  color: 0x808080,
})
mirror.rotation.set(4.71, 0, 0)
mirror.position.set(0, -51, 2000)
scene.add(mirror)

const darkernerGeometry = new PlaneGeometry(3000, 5000)
const darkenerMaterial = new MeshStandardMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: .5,
  metalness: 1
})
const darkenerMesh = new Mesh(darkernerGeometry, darkenerMaterial) 
darkenerMesh.rotation.set(4.71, 0, 0)
darkenerMesh.position.set(0, -50, 1900)
scene.add(darkenerMesh)

function animate(){
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix()

  renderer.render(scene, camera)
  // composer.render()
  
  requestAnimationFrame(animate)
}

onMounted(() => {
  renderer = new WebGLRenderer({canvas: canvasRef.value})
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)

  controls = new OrbitControls(camera, renderer.domElement)
  // controls.maxPolarAngle = Math.PI / 2;

  // const renderScene = new RenderPass(scene, camera)
  // composer = new EffectComposer(renderer)
  // composer.addPass(renderScene)
  // const bloomPass = new UnrealBloomPass(
  // new Vector2(window.innerWidth, window.innerHeight),
  //   .8,
  //   .1,
  //   .1
  // )
  // composer.addPass(bloomPass)

  animate()
});

</script>

<template>
    <div>
        <canvas ref="canvasRef"/>
    </div>
</template>

<style scoped>
canvas{
    position: fixed;
}
</style>