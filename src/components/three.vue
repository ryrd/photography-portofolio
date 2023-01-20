<script setup lang="ts">
import { ref, onMounted} from 'vue';
import { AmbientLight, DirectionalLightHelper, RectAreaLight, Raycaster, PlaneGeometry, BackSide,BoxGeometry, CubeCamera, CircleGeometry, Color as TColor, DirectionalLight, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, DoubleSide, PointLight, Scene, SphereGeometry, Vector2, WebGLRenderer, Light} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import {GUI} from 'dat.gui'

const canvasRef = ref()

let scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer, controls: any, composer: any
const pointer = new Vector2()
const raycaster = new Raycaster()

const gui = new GUI()

scene = new Scene()
// scene.background = new TColor(0x555555)

camera = new PerspectiveCamera(63, window.innerWidth/window.innerHeight, .1, 10000)
camera.position.set(0,0,1.5)

const directionalLight = new DirectionalLight(0x66a5ff, 3)
directionalLight.position.set(0,1,-5)
directionalLight.rotation.set(-1.3,0,0)
scene.add(directionalLight)
// const helper = new DirectionalLightHelper(directionalLight);
// gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.1)
// gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.1)
// gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.1)
// gui.add(directionalLight.rotation, 'x').min(-5).max(5).step(0.1)
// gui.add(directionalLight.rotation, 'y').min(-5).max(5).step(0.1)
// gui.add(directionalLight.rotation, 'z').min(-5).max(5).step(0.1)
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

const boxLight = new BoxGeometry( 3.4, 4.5, .1 )
const boxLightMaterial = new MeshBasicMaterial({color: 0x66a5ff})
const lightBox = new Mesh( boxLight, boxLightMaterial )
lightBox.position.set(0, 1.25, -10.2)
scene.add(lightBox)
// gui.add(cube.scale, 'x').min(-10).max(10).step(.1)

const mirrorGeometry = new PlaneGeometry(100, 500)
const mirror = new Reflector(mirrorGeometry, {
  textureWidth : window.innerWidth*window.devicePixelRatio, 
  textureHeight : window.innerHeight*window.devicePixelRatio,
  color: 0x808080,
})
mirror.rotation.set(4.71, 0, 0)
mirror.position.set(0, -1, 0)
// gui.add(mirror.position, 'y').min(-3).max(5).step(.001)
scene.add(mirror)

// const darkernerGeometry = new PlaneGeometry(100, 500)
// const darkenerMaterial = new MeshStandardMaterial({
//   color: 0xFFFFFF,
//   transparent: true,
//   opacity: 1,
//   side: DoubleSide
//   metalness: 1
// })
// const darkenerMesh = new Mesh(darkernerGeometry, darkenerMaterial) 
// darkenerMesh.rotation.set(4.71, 0, 0)
// darkenerMesh.position.set(0, -0.15, 2000)
// scene.add(darkenerMesh)

const photoBox1Geo = new PlaneGeometry(.1, .1)
const photoBox1Mat = new MeshBasicMaterial({color: 0x1111FF})
const photoBox1 = new Mesh(photoBox1Geo, photoBox1Mat)
photoBox1.position.set(-0.18,0.067,1.164)
// gui.add(photoBox1.position, 'x').min(-1).max(1).step(.001)
// gui.add(photoBox1.position, 'y').min(0).max(1).step(.001)
// gui.add(photoBox1.position, 'z').min(-2).max(2).step(.001)

scene.add(photoBox1)

function animate(){
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix()

  // renderer.render(scene, camera)
  composer.render()
  
  requestAnimationFrame(animate)
}

onMounted(() => {
  renderer = new WebGLRenderer({canvas: canvasRef.value})
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)

  controls = new OrbitControls(camera, renderer.domElement)

  const renderScene = new RenderPass(scene, camera)
  composer = new EffectComposer(renderer)
  composer.addPass(renderScene)
  const bloomPass = new UnrealBloomPass(
  new Vector2(window.innerWidth, window.innerHeight),
    .8,
    .1,
    .1
  )
  composer.addPass(bloomPass)

  window.addEventListener("mousedown", e => {
    pointer.x = (e.clientX/window.innerWidth)*2-1
    pointer.y = -(e.clientY/window.innerHeight)*2+1

    raycaster.setFromCamera(pointer, camera)
    const intersect = raycaster.intersectObjects(scene.children)[0] || null

    if (intersect !== null ) console.log(intersect);
  })

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