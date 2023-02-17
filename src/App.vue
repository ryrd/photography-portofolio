<script setup lang="ts">
import {onMounted, ref} from 'vue'
import three from './components/three.vue';
import txt from './components/txt.vue';
// const Pace = require('/pace-js')

import { useAnimStore } from './stores/AnimStore'

const startAnim = useAnimStore()

console.log('preloader', startAnim.preloaderDone);

// Pace.on('done', () => {
//   const preloader = document.querySelector('#preloader')! as HTMLDivElement
//   const preloaderText = document.querySelector('#preloader-text')! as HTMLHeadingElement
  
//   preloader.style.opacity = '0';
//   preloaderText.style.filter = 'blur(30px)';

//   startAnim.preloaderDoneSignal()

//   setTimeout(() => {
//     preloader.style.display = 'none';
//   }, 800);
// })
</script>

<template>
  <div>
    <three />
    <txt/>
    <div id="down"/>
  </div>
</template>

<style>
::-webkit-scrollbar{
    width: 0px;
}
::-moz-selection {
  background: transparent;
}
::selection {
  background: transparent;
}

html, body{
  overflow-x: hidden;
  width: 100vw;
}
#down{
  height: 400vh;
}
@media (max-width:780px) {
  #down{
    height: 460vh;
  }
}
</style>