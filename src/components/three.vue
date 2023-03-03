<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import { Color as TColor, AmbientLight, TextureLoader, Raycaster, PlaneGeometry, BoxGeometry, DirectionalLight, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, Vector2, WebGLRenderer, Intersection, Object3D, Event } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {Reflector} from 'three/examples/jsm/objects/Reflector'
import gsap, {Expo} from 'gsap'
import data from '../data'

const canvasRef = ref()

let renderer: WebGLRenderer, composer: any

const pointer = new Vector2()
const raycaster = new Raycaster()

const scene = new Scene()
scene.background = new TColor(0x000000)

const camera = new PerspectiveCamera(63, window.innerWidth/window.innerHeight, .1, 10000)

const directionalLight = new DirectionalLight(0x0071f2, 1)
directionalLight.position.set(0,1,-5)
directionalLight.rotation.set(-1.3,0,0)
scene.add(directionalLight)
const ambientLight = new AmbientLight(0x0071f2, .3)
scene.add(ambientLight)

const startAnimEmit = defineEmits<{(e: 'change-start-anim', value: boolean): void}>();
const changeStartAnim = () => startAnimEmit('change-start-anim', true)

const loader = new GLTFLoader()
loader.load('/boy.gltf', (gltf: any) => {
    const obj = gltf.scene
    obj.position.set(0,-1,-3)
    obj.rotation.set(0, 80, 0)
    obj.scale.set(.7,.7,.7)

    scene.add(gltf.scene)
    renderer.render(scene, camera)

    changeStartAnim()
    animate()
  })

const bgPic = new TextureLoader().load('/bg.svg')
const bgGeo = new BoxGeometry( 28, 12, .1 )
const bgMaterial = new MeshBasicMaterial({map: bgPic})
const bg = new Mesh( bgGeo, bgMaterial )
bg.position.set(0, 4.85, -10.2)
scene.add(bg)

const mirrorGeometry = new PlaneGeometry(100, 500)
const mirror = new Reflector(mirrorGeometry, {
  textureWidth : window.innerWidth*window.devicePixelRatio, 
  textureHeight : window.innerHeight*window.devicePixelRatio,
  color: 0x808080,
})
mirror.rotation.set(4.71, 0, 0)
mirror.position.set(0, -1, 0)
scene.add(mirror)

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

  renderer.render(scene, camera)
  
  requestAnimationFrame(animate)
}

let portrait = window.matchMedia("(orientation: portrait)").matches ? true : false,
    scrollable = true,
    aPhotoIsViewed = false,
    viewedPhotoId = -1
const prevCoordinate = {
  X : 0,
  Y : 0,
  Z : 0,
}

onMounted(() => {
  renderer = new WebGLRenderer({canvas: canvasRef.value, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)

  window.addEventListener("scroll", () => {
    const top = document.body.getBoundingClientRect().top
    if (scrollable) camera.position.z = top*-0.007
  })

  window.addEventListener('mousemove', e => {
    if (window.innerWidth < 700) return

    let windowHeight = window.innerHeight
    let windowWidth = window.innerWidth
    let xValue = e.x
    let yValue = e.y

    let mousePosX = -((-1+(xValue/windowWidth)*2)/40)
    let mousePosY = ((1-(yValue/windowHeight)*2)/40)

    camera.rotation.set(mousePosY, mousePosX, 0)
  })

  function closePhotoPreview(intersect: Intersection<Object3D<Event>>){
    document.body.style.overflowY = 'scroll'
  
    gsap.to(intersect.object.position, {
      duration: .2,
      ease: Expo.easeIn,
      x : prevCoordinate.X,
      y : prevCoordinate.Y,
      z : prevCoordinate.Z,
    })
    prevCoordinate.X = 0; 
    prevCoordinate.Y = 0; 
    prevCoordinate.Z = 0;

    scrollable = true
    aPhotoIsViewed = false
    viewedPhotoId = -1
  }

  let clicked = 0, lastClick = 0
  window.addEventListener("mousedown", e => {
    pointer.x = (e.clientX/window.innerWidth)*2-1
    pointer.y = -(e.clientY/window.innerHeight)*2+1

    raycaster.setFromCamera(pointer, camera)
    const intersect = raycaster.intersectObjects(scene.children)[0] || null

    if (intersect === null) return
    
    if (intersect.object.name === "photo") {
      if (viewedPhotoId === -1){
        scrollable = false
        aPhotoIsViewed = true
        viewedPhotoId = intersect.object.id
        
        if (!scrollable) {
          prevCoordinate.X = intersect.object.position.x
          prevCoordinate.Y = intersect.object.position.y
          prevCoordinate.Z = intersect.object.position.z
  
          document.body.style.overflowY = 'hidden'
          
          gsap.to(intersect.object.position, {
            duration: .25,
            ease: Expo.easeOut,
            x : 0,
            y : 0,
            z : portrait ? ((document.body.getBoundingClientRect().top)*-0.007)-.4 : ((document.body.getBoundingClientRect().top)*-0.007)-.18,
          })
        }
      }
      else if (intersect.object.id === viewedPhotoId){
        closePhotoPreview(intersect)
      }
    }
    else if(intersect.object.name === "Hoodie" || intersect.object.name === "pant" || intersect.object.name === "man" || intersect.object.name === "leftshoe"){
      let date = new Date()
      let time = date.getTime()
      const time_between_taps = 200
      if (time-lastClick < time_between_taps) clicked += 1
      lastClick = time
      
      setTimeout(() => {
        if(time-lastClick === 0) clicked = 0
      }, 800)

      if(clicked === 30){
        const down = document.querySelector('#down')! as HTMLDivElement
        down.style.height = '1200vh'

        const loader2 = new GLTFLoader()
        loader2.load('/man.gltf', (gltf: any) => {
            const obj = gltf.scene
            obj.position.set(-1.1,-.5,30)
            obj.rotation.set(0, .3, 0)

            scene.add(gltf.scene)
        })
        
        const imgs = [
          {
            url: 'QdCRXF2F/m1.jpg',
            dimension: {
              width: .26,
              height: .15,
            },
            position: {
              x: -.7,
              y: 1,
              z: 30
            }
          },
          {
            url: 'FF25vf2P/m2.jpg',
            dimension: {
              width: .24,
              height: .12,
            },
            position: {
              x: .9,
              y: .2,
              z: 40
            }
          },
          {
            url: '506Td1pd/m3.jpg',
            dimension: {
              width: .24,
              height: .12,
            },
            position: {
              x: -.45,
              y: .15,
              z: 50
            }
          },
        ]

        imgs.forEach(img => {
          const eg = new TextureLoader().load(`https://i.postimg.cc/${img.url}`)
          const egGeo = new PlaneGeometry(img.dimension.width, img.dimension.height)
          const egMat = new MeshBasicMaterial({map: eg})
          const egPhotoBox = new Mesh(egGeo, egMat)
          egPhotoBox.position.set(img.position.x, img.position.y, img.position.z)
          egPhotoBox.name = "photo"
          scene.add(egPhotoBox)
        })
      }
    }

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
    top: 0;
    left: 0;
    z-index: 0;
}
</style>