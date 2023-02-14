<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from 'vue';
import gsap, {Linear, Power1} from 'gsap'

const startAnim = defineProps<{startAnim: boolean}>();

const openingAnim = gsap.timeline({defaults: {opacity: 0.8, duration: .53, ease: Linear.easeNone}})

watch(startAnim, () => {
    openingAnim
        .fromTo('.ryrd-text', 
            {
                filter : 'blur(10px)',
                opacity : 0,
            }
            ,{
                filter : 'blur(0.4px)',
                opacity : 0.75,
                delay: .2,
                duration : .8,
            }
        )
        .fromTo('.indicator-text', 
            {
                filter : 'blur(10px)',
                opacity : 0,
            },{
                filter : 'blur(0.4px)',
                opacity : 1,
                delay: .4,
                duration : .5,
            }, 
        '<')
        .fromTo('.black-layer', 
            {
                opacity : 0,
            },{
                opacity : .85,
                delay: .4,
                duration : .5,
            }, 
        '<')
        .to('#txt-1',  {}, '-=.55')
        .to('#txt-13', {}, '-=.7' )
        .to('#txt-6',  {}, '-=.65')
        .to('#txt-3',  {}, '-=.75')
        .to('#txt-19', {}, '-=1' )
        .to('#txt-15', {}, '-=.9' )
        .to('#txt-4',  {}, '-=1' )
        .to('#txt-16', {}, '-=.7' )
        .to('#txt-2',  {}, '-=1' )
        .to('#txt-10', {}, '-=.95')
        .to('#txt-8',  {}, '-=.9' )
        .to('#txt-17', {}, '-=.75')
        .to('#txt-21', {}, '-=.8' )
        .to('#txt-9',  {}, '-=.8' )
        .to('#txt-7',  {}, '-=.75')
        .to('#txt-12', {}, '-=.7' )
        .to('#txt-14', {}, '-=.65')
        .to('#txt-18', {}, '-=.7')
        .to('#txt-11', {}, '-=.65')
        .to('#txt-5',  {}, '-=.65')
        .to('#txt-20', {}, '-=.6' )
})

const scrolled = ref(false)
watch(scrolled, () => {
    if (scrolled.value){
        gsap.to(['.site-heading','.indicator-text'], {
            filter: 'blur(50px)',
            opacity: 0,            
            duration : 1,
            ease: Power1.easeOut
        })
    }
    else{
        gsap.to(['.site-heading','.indicator-text'], {
            filter: 'blur(0px)',
            opacity: 1,            
            duration : .6,
            ease: Power1.easeInOut
        })
    }
})
onMounted(() => {
    window.addEventListener('scroll', () => {
        window.scrollY >= 100 ? scrolled.value = true : scrolled.value = false
    })
})
</script>

<template>
    <div class="fixed top-0 left-0 w-screen h-screen bg-transparent z-10 flex flex-col items-center justify-between">
        <div class="h-[30vh] flex justify-center items-center">
            <h1 class="text-white text-center leading-6 md:leading-none site-heading">
                <span class="font-orbitron opacity-0 text-[7vw] md:text-[2.5vw] ryrd-text">RYRD's</span>
                <br/>
                <span class="font-orbitron text-[6vw] md:text-[3vw] tracking-wider opacity-90 porto-text">
                    <span class="opacity-0" id="txt-1">P</span>
                    <span class="opacity-0" id="txt-2">h</span>
                    <span class="opacity-0" id="txt-3">o</span>
                    <span class="opacity-0" id="txt-4">t</span>
                    <span class="opacity-0" id="txt-5">o</span>
                    <span class="opacity-0" id="txt-6">g</span>
                    <span class="opacity-0" id="txt-7">r</span>
                    <span class="opacity-0" id="txt-8">a</span>
                    <span class="opacity-0" id="txt-9">p</span>
                    <span class="opacity-0" id="txt-10">h</span>
                    <span class="opacity-0" id="txt-11">y</span>
                    <span>&nbsp;</span>
                    <span class="opacity-0" id="txt-12">p</span>
                    <span class="opacity-0" id="txt-13">o</span>
                    <span class="opacity-0" id="txt-14">r</span>
                    <span class="opacity-0" id="txt-15">t</span>
                    <span class="opacity-0" id="txt-16">o</span>
                    <span class="opacity-0" id="txt-17">f</span>
                    <span class="opacity-0" id="txt-18">o</span>
                    <span class="opacity-0" id="txt-19">l</span>
                    <span class="opacity-0" id="txt-20">i</span>
                    <span class="opacity-0" id="txt-21">o</span>
                </span>
            </h1>
        </div>
        <div class="h-[12vh] text-white opacity-0 text-center mb-[5vh] font-orbitron tracking-wide leading-none text-[2.25vw] md:text-[.85vw] flex flex-col justify-center px-[5vw] md:px-[3vw] indicator-text">
            <span>scroll down to explore.</span><br/>
            <span>tap on floating photo for full view.</span>
        </div>
        <div class="absolute bg-black opacity-0 bg-opacity-30 blur-lg bottom-[2vh] md:bottom-[1vh] left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[50vw] md:w-[20vw] h-[8vh] md:h-[10vh] black-layer"/>
    </div>
</template>

<style scoped>
@keyframes flicker {
    0% { opacity: .75; }
    20% { opacity: .75; }
    22% { opacity: .6; }
    24% { opacity: .85; }
    26% { opacity: .65; }
    28% { opacity: .75; }
    60% { opacity: .75; }
    62% { opacity: .75; }
    64% { opacity: .75; }
    100% { opacity: .75; }
}
@keyframes flicker2 {
    0% { opacity: .9; }
    20% { opacity: .9; }
    22% { opacity: .8; }
    24% { opacity: .85; }
    26% { opacity: .8; }
    28% { opacity: .9; }
    60% { opacity: .9; }
    62% { opacity: .8; }
    64% { opacity: .9; }
    100% { opacity: .9; }
}
.site-heading{
    text-shadow: 0px 0px 5px rgb(0, 140, 255),
                 0px 0px 24px rgb(0, 140, 255),
                 0px 0px 70px rgba(0, 140, 255, .6),
                 0px 0px 150px rgba(0, 140, 255, .6);
}
.ryrd-text{
    font-weight: 800;
    animation-name: flicker;
    animation-duration: 2s;
    animation-delay: 3s;
    animation-iteration-count: infinite;
}
.porto-text{
    font-weight: 400;
    animation-name: flicker2;
    animation-duration: 2s;
    animation-delay: 3.7s;
    animation-iteration-count: infinite;
}
.indicator-text{
    animation-name: flicker2;
    animation-duration: 3s;
    animation-delay: 4s;
    animation-iteration-count: infinite;
}
</style>
