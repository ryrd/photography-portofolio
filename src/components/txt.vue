<script setup lang="ts">
import ref from 'vue'
</script>

<template>
    <div class="fixed top-0 left-0 w-screen h-screen bg-transparent z-10 flex flex-col items-center justify-between">
        <div class="h-[30vh] flex justify-center items-center">
            <h1 class="text-white text-center leading-6 md:leading-none site-heading">
                <span class="font-orbitron text-[7vw] md:text-[2.5vw] ryrd-text">RYRD's</span><br/>
                <span class="font-orbitron text-[6vw] md:text-[3vw] tracking-wider porto-text">Photography portofolio</span>
            </h1>
        </div>
        <div class="h-[12vh] text-white opacity-80 text-center mb-[5vh] font-orbitron tracking-wide leading-none text-[2.25vw] md:text-[.85vw] flex flex-col justify-center px-[5vw] md:px-[3vw] indicator-text">
            <span>scroll down to explore.</span><br/>
            <span>tap on floating photo for full view.</span>
        </div>
    </div>
</template>

<style scoped>
.site-heading{
    opacity: .8;
    filter: blur(.4px);
    text-shadow: 0px 0px 24px rgb(0, 140, 255),
                 0px 0px 70px rgba(0, 140, 255, .6),
                 0px 0px 150px rgba(0, 140, 255, .6);
}
.ryrd-text{
    font-weight: 800;
}
.porto-text{
    font-weight: 400;
}
.indicator-text{
    background: url('../../public/blur.png');
    
}
</style>
