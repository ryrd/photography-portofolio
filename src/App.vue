<script setup lang="ts">
import three from './components/three.vue';
</script>

<template>
  <div>
    <three/>
    <div id="down"/>
  </div>
</template>

<style>
::-webkit-scrollbar{
    width: 0px;
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