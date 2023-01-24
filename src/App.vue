<script setup lang="ts">
import three from './components/three.vue';
import text from './components/text.vue';
</script>

<template>
  <div>
    <three/>
    <!-- <text/> -->
    <div id="down"></div>
  </div>
</template>

<style>
::-webkit-scrollbar{
    width: 0px;
}

#down{
  height: 320vh;
}
@media (max-width:780px) {
  #down{
    height: 460vh;
  }
}
</style>