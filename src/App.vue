<script setup lang="ts">
import {ref} from 'vue'
import three from './components/three.vue';
import txt from './components/txt.vue';

const startAnim = ref(false)

const changeStartAnim = (value: boolean) => startAnim.value = value
</script>

<template>
  <div>
    <three @change-start-anim="changeStartAnim" />
    <txt :startAnim="startAnim"/>
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
  background: black;
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