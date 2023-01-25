<script setup lang="ts">
import { onMounted } from 'vue';
import gsap, {Linear} from 'gsap'

const openingAnim = gsap.timeline({defaults: {opacity: 0, duration: .53, ease: Linear.easeNone}})

onMounted(() => {
    openingAnim
        .from('.ryrd-text', {
            filter : 'blur(10px)',
            delay: .2,
            duration : 1.2,
        })
        .from('.indicator-text', {
            filter : 'blur(10px)',
            delay: .4,
            duration : .8,
        }, '<')
        .from('.black-layer', {
            filter : 'blur(10px)',
        }, '<')
        .from('#txt-1',  {}, '-=.35')
        .from('#txt-13', {}, '-=.5' )
        .from('#txt-6',  {}, '-=.45')
        .from('#txt-3',  {}, '-=.55')
        .from('#txt-19', {}, '-=.8' )
        .from('#txt-15', {}, '-=.7' )
        .from('#txt-4',  {}, '-=.8' )
        .from('#txt-16', {}, '-=.5' )
        .from('#txt-2',  {}, '-=.8' )
        .from('#txt-10', {}, '-=.75')
        .from('#txt-8',  {}, '-=.7' )
        .from('#txt-17', {}, '-=.55')
        .from('#txt-21', {}, '-=.6' )
        .from('#txt-9',  {}, '-=.6' )
        .from('#txt-7',  {}, '-=.55')
        .from('#txt-12', {}, '-=.5' )
        .from('#txt-14', {}, '-=.45')
        .from('#txt-18', {}, '-=.49')
        .from('#txt-11', {}, '-=.45')
        .from('#txt-5',  {}, '-=.46')
        .from('#txt-20', {}, '-=.4' )
})
</script>

<template>
    <div class="fixed top-0 left-0 w-screen h-screen bg-transparent z-10 flex flex-col items-center justify-between">
        <div class="h-[30vh] flex justify-center items-center">
            <h1 class="text-white text-center leading-6 md:leading-none site-heading">
                <span class="font-orbitron text-[7vw] md:text-[2.5vw] ryrd-text">RYRD's</span>
                <br/>
                <span class="font-orbitron text-[6vw] md:text-[3vw] tracking-wider porto-text">
                    <span id="txt-1">P</span>
                    <span id="txt-2">h</span>
                    <span id="txt-3">o</span>
                    <span id="txt-4">t</span>
                    <span id="txt-5">o</span>
                    <span id="txt-6">g</span>
                    <span id="txt-7">r</span>
                    <span id="txt-8">a</span>
                    <span id="txt-9">p</span>
                    <span id="txt-10">h</span>
                    <span id="txt-11">y</span>
                    <span>&nbsp;</span>
                    <span id="txt-12">p</span>
                    <span id="txt-13">o</span>
                    <span id="txt-14">r</span>
                    <span id="txt-15">t</span>
                    <span id="txt-16">o</span>
                    <span id="txt-17">f</span>
                    <span id="txt-18">o</span>
                    <span id="txt-19">l</span>
                    <span id="txt-20">i</span>
                    <span id="txt-21">o</span>
                </span>
            </h1>
        </div>
        <div class="h-[12vh] text-white opacity-80 text-center mb-[5vh] font-orbitron tracking-wide leading-none text-[2.25vw] md:text-[.85vw] flex flex-col justify-center px-[5vw] md:px-[3vw] indicator-text">
            <span>scroll down to explore.</span><br/>
            <span>tap on floating photo for full view.</span>
        </div>
        <div class="absolute bg-black bg-opacity-30 blur-lg bottom-[1vh] left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[20vw] h-[10vh] black-layer"/>
    </div>
</template>

<style scoped>
@keyframes flicker {
    0% { opacity: .75; }
    20% { opacity: .75; }
    22% { opacity: .53; }
    24% { opacity: .65; }
    26% { opacity: .49; }
    28% { opacity: .75; }
    60% { opacity: .75; }
    62% { opacity: .65; }
    64% { opacity: .75; }
}
.site-heading{
    filter: blur(.4px);
    text-shadow: 0px 0px 5px rgb(0, 140, 255),
                 0px 0px 24px rgb(0, 140, 255),
                 0px 0px 70px rgba(0, 140, 255, .6),
                 0px 0px 150px rgba(0, 140, 255, .6);
}
.indicator-text{
    animation-name: flicker;
    animation-duration: 3s;
    animation-delay: 4s;
    animation-iteration-count: infinite;
}
.ryrd-text{
    font-weight: 800;
    opacity: .75;
    animation-name: flicker;
    animation-duration: 2s;
    animation-delay: 3s;
    animation-iteration-count: infinite;
}
.porto-text{
    font-weight: 400;
    opacity: .75;
    animation-name: flicker;
    animation-duration: 2s;
    animation-delay: 3.7s;
    animation-iteration-count: infinite;
}
</style>
