<script setup lang="ts">
import { ref, onMounted} from 'vue';
import { AmbientLight, DirectionalLightHelper, RectAreaLight, TextureLoader, Raycaster, PlaneGeometry, BackSide,BoxGeometry, CubeCamera, CircleGeometry, Color as TColor, DirectionalLight, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, DoubleSide, PointLight, Scene, SphereGeometry, Vector2, WebGLRenderer, Light} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {Reflector} from 'three/examples/jsm/objects/Reflector'
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import gsap, {Power4} from 'gsap'
import {GUI} from 'dat.gui'

import data, {dataType} from '../data'

const canvasRef = ref()

// let scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer, controls: any, composer: any
let renderer: WebGLRenderer, composer: any, controls: any
let scrollable = true
const prevCoordinate = {
  X : 0,
  Y : 0,
  Z : 0,
}

const pointer = new Vector2()
const raycaster = new Raycaster()

// const gui = new GUI()

const scene = new Scene()
// scene.background = new TColor(0x555555)

const camera = new PerspectiveCamera(63, window.innerWidth/window.innerHeight, .1, 10000)
// camera.position.set(0,0,0)

const directionalLight = new DirectionalLight(0x0071f2, 1)
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
const ambientLight = new AmbientLight(0x66a5ff, .2)
scene.add(ambientLight)

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
const boxLightMaterial = new MeshBasicMaterial({color: 0x60aaff})
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

// const pic1 = new TextureLoader().load('/photos/img-5.webp')
// const photoBox1Geo = new PlaneGeometry(.1, .15)
// const photoBox1Mat = new MeshBasicMaterial({map: pic1})
// const photoBox1 = new Mesh(photoBox1Geo, photoBox1Mat)
// photoBox1.position.set(0.633,0.346,-0.877)
// photoBox1.name = 'photo'
// gui.add(photoBox1.position, 'x').min(-1).max(1).step(.001)
// gui.add(photoBox1.position, 'y').min(0).max(1).step(.001)
// gui.add(photoBox1.position, 'z').min(-2).max(2).step(.001)
// scene.add(photoBox1)

interface imageType {
  photo: string,
  dimension: {
    width: number,
    height: number,
  };
  position: {
    x: number,
    y: number,
    z: number,
  }
}

data.forEach((image: imageType) => {
  const imgUrl = new TextureLoader().load(image.photo)
  const photoBoxGeo = new PlaneGeometry(image.dimension.width, image.dimension.height)
  const photoBoxMat = new MeshBasicMaterial({map: imgUrl})
  const photoBox = new Mesh(photoBoxGeo, photoBoxMat)
  photoBox.position.set(image.position.x,image.position.y,image.position.z)
  photoBox.name = "photo"
  scene.add(photoBox)
});


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

  // controls = new OrbitControls(camera, renderer.domElement)

  const renderScene = new RenderPass(scene, camera)
  composer = new EffectComposer(renderer)
  composer.addPass(renderScene)
  const bloomPass = new UnrealBloomPass(
    new Vector2(window.innerWidth, window.innerHeight),
    .65,
    .5,
    0
  )
  composer.addPass(bloomPass)

  window.addEventListener("scroll", () => {
    const top = document.body.getBoundingClientRect().top
    if (scrollable) camera.position.z = top*-0.007
  })

  window.addEventListener("mousedown", e => {
    pointer.x = (e.clientX/window.innerWidth)*2-1
    pointer.y = -(e.clientY/window.innerHeight)*2+1

    raycaster.setFromCamera(pointer, camera)
    const intersect = raycaster.intersectObjects(scene.children)[0] || null

    // console.log(intersect.object)
    if (intersect !== null && intersect.object.name === "photo" ) {
      scrollable = !scrollable

      if (!scrollable) {
        prevCoordinate.X = intersect.object.position.x
        prevCoordinate.Y = intersect.object.position.y
        prevCoordinate.Z = intersect.object.position.z

        document.body.style.overflowY = 'hidden'
        
        gsap.to(intersect.object.position, {
          duration: 0.3,
          ease: Power4.easeOut,
          x : 0,
          y : 0,
          z : ((document.body.getBoundingClientRect().top)*-0.007)-.18,
        })
      }
      else{
        document.body.style.overflowY = 'scroll'

        gsap.to(intersect.object.position , {
          duration: 0.3,
          ease: Power4.easeInOut,
          x : prevCoordinate.X,
          y : prevCoordinate.Y,
          z : prevCoordinate.Z,
        })
        prevCoordinate.X = 0; 
        prevCoordinate.Y = 0; 
        prevCoordinate.Z = 0;
      }

    };
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