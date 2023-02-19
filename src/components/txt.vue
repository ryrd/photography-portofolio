<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from 'vue';
import gsap, {Linear, Power1, Expo} from 'gsap'

const startAnim = defineProps<{startAnim: boolean}>();

const openingAnim = gsap.timeline({defaults: {opacity: 0.8, duration: .53, ease: Linear.easeNone}})

watch(startAnim, () => {
    openingAnim
        .to('#preloader-text', {
            filter: 'blur(40px)',
            scale: 1.5,
            duration: .1,
            ease: Expo.easeIn,
        })
        .to('#preloader', {
            opacity: 0,
            duration: .3,
        },'+=.2')
        .fromTo('.ryrd-text', 
            {
                filter : 'blur(10px)',
                opacity : 0,
            }
            ,{
                filter : 'blur(0.4px)',
                opacity : 0.75,
                duration : .6,
            }
        ,'-=.2')
        .fromTo('.indicator-text', 
            {
                filter : 'blur(10px)',
                opacity : 0,
            },{
                filter : 'blur(0.4px)',
                opacity : 1,
                duration : .5,
            }, 
        '<')
        .fromTo('.black-layer', 
            {
                opacity : 0,
            },{
                opacity : .9,
                delay: .4,
                duration : .5,
            }, 
        '<')
        .fromTo('#credit', 
            {
                opacity : 0,
            },{
                opacity : .7,
                delay: .5,
                duration : .5,
            }, 
        '<')
        .to('#txt-1',  {}, '-=.55')
        .to('#txt-13', {}, '-=.7' )
        .to('#txt-6',  {}, '-=.65')
        .to('#txt-3',  {}, '-=.75')
        .to('#txt-19', {}, '-=1'  )
        .to('#txt-15', {}, '-=.9' )
        .to('#txt-4',  {}, '-=1'  )
        .to('#txt-16', {}, '-=.7' )
        .to('#txt-2',  {}, '-=1'  )
        .to('#txt-10', {}, '-=.95')
        .to('#txt-8',  {}, '-=.9' )
        .to('#txt-17', {}, '-=.75')
        .to('#txt-21', {}, '-=.8' )
        .to('#txt-9',  {}, '-=.8' )
        .to('#txt-7',  {}, '-=.75')
        .to('#txt-12', {}, '-=.7' )
        .to('#txt-14', {}, '-=.65')
        .to('#txt-18', {}, '-=.7' )
        .to('#txt-11', {}, '-=.65')
        .to('#txt-5',  {}, '-=.65')
        .to('#txt-20', {}, '-=.6' )
        .set('#preloader', {display: 'none'})
})

const scrolled = ref(false)
watch(scrolled, () => {
    if (scrolled.value){
        gsap.to(['.site-heading','.indicator-text'], {
            filter: 'blur(23px)',
            opacity: 0,
            duration : .5,
            ease: Power1.easeOut
        })
        gsap.to(['.black-layer', '#credit'], {
            opacity: 0,
            duration : .3,
            ease: Power1.easeOut
        })
    }
    else{
        gsap.to(['.site-heading','.indicator-text'], {
            filter: 'blur(0px)',
            opacity: .9,
            duration : .4,
            ease: Power1.easeInOut
        })
        gsap.to(['.black-layer', '#credit'], {
            opacity: .7,
            duration : .3,
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
    <div class="fixed top-0 left-0 w-screen bg-transparent z-10 flex flex-col items-center justify-between" id="main-txt-container">
        <div id="preloader">
            <h1 id="preloader-text">
                <span class=mr-0>LOADING</span>
                <span class="opacity-0" id="dot-1">.</span>
                <span class="opacity-0" id="dot-2">.</span>
                <span class="opacity-0" id="dot-3">.</span>
            </h1>
        </div>

        <div class="h-[30vh] flex justify-center items-center">
            <h1 class="text-white text-center leading-6 md:leading-none site-heading">
                <span class="font-orbitron opacity-0 text-[7vw] portrait:md:text-[5vw] md:text-[2.5vw] ryrd-text">RYRD</span>
                <br/>
                <span class="font-orbitron text-[6vw] portrait:md:text-[5.5vw] md:text-[3vw] tracking-wider opacity-90 porto-text">
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
        <div class="h-[12vh] text-white opacity-0 text-center mb-[5vh] portrait:md:mb-[2vh] font-orbitron tracking-wide leading-none text-[2.25vw] portrait:md:text-[1.2vw] md:text-[.85vw] flex flex-col justify-center px-[5vw] md:px-[3vw] indicator-text">
            <span>scroll down to explore.</span><br/>
            <span>tap on floating photo for full view.</span>
        </div>
        <div class="absolute bg-black opacity-0 bg-opacity-40 blur-lg bottom-[2vh] md:bottom-[1vh] left-1/2 -translate-x-1/2 -translate-y-1/2 portrait:md:-translate-y-0 -z-10 w-[50vw] portrait:md:w-[30vw] md:w-[20vw] h-[8vh] md:h-[10vh] black-layer"/>

        <div class="absolute right-5 bottom-6 md:right-12 md:bottom-10 text-white opacity-0 font-orbitron italic underline decoration-[1.5px] decoration-white/[.7] underline-offset-2 tracking-wider" id="credit">
            <span class="text-[2.15vw] portrait:md:text-[1.2vw] md:text-[.65vw]">credit</span>
            <div class="absolute top-[-220%] md:top-[-200%] w-[22vw] md:w-[18.5vw] right-0 px-1 md:px-2 py-1 text-[1.5vw] portrait:md:text-[1.2vw] md:text-[.65vw] border opacity-0 bg-black bg-opacity-20 transition-all linear duration-400" id="credit-full">
                3d model by Alexand Maltsev, Pieter Ferreira, FAHAD, WhyBlue, ecophobic, and ItsReynTime from sketchfab.com
            </div>
        </div>
    </div>
</template>

<style scoped>
#main-txt-container{
    height: 100dvh;
}

@keyframes flicker {
    0% { opacity: .8; }
    20% { opacity: .8; }
    22% { opacity: .7; }
    24% { opacity: .8; }
    26% { opacity: .75; }
    28% { opacity: .8; }
    76% { opacity: .8; }
    78% { opacity: .7; }
    80% { opacity: .8; }
    100% { opacity: .8; }
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
#credit-full{
    clip-path: polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%);
    background-color: white;
}

#credit:hover #credit-full{
    opacity: 1;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    background-color: #0000006c;
    transform: translateY(-18%);
}

@media (min-width: 650px){
    #credit:hover #credit-full{
        transform: translateY(-5%);
    }
}
@media (min-width: 500px) and (max-width: 1000px) and (orientation: portrait){
    #credit:hover #credit-full{
        transform: translateY(-45%);
    }
}
@media (min-width: 1300px){
    #credit:hover #credit-full{
        transform: translateY(-18%);
    }
}
@media (min-width: 1800px){
    #credit:hover #credit-full{
        transform: translateY(-25%);
    }
}
@media (min-width: 2300px){
    #credit:hover #credit-full{
        transform: translateY(-49%);
    }
}

/* preloader code */
#preloader{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
    top: 0;
    left: 0;
	overflow: hidden;
    height: 100vh;
    width: 100vw;
    z-index: 110;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: black;
}
#preloader-text{
    color: transparent;
    position: fixed;
    font-family: 'orbitron', 'arial';
    font-weight: 800;
    letter-spacing: 5px;
    font-size: 12vh;
    z-index: 100;
	color: white;
	transition : 1s ease-out;
    animation: flicker 1.7s infinite;
    filter: blur(.5px);
    text-shadow: 0px 0px 5px rgb(0, 140, 255),
                 0px 0px 24px rgb(0, 140, 255),
                 0px 0px 70px rgba(0, 140, 255, .6),
                 0px 0px 150px rgba(0, 140, 255, .6);
}

#dot-1{
    animation: dot 1.5s infinite;
}
@keyframes dot {
    0% { opacity: 0; }
    40% { opacity: 0; }
    60% { opacity: 1; }
    90% { opacity: 1; }
    100% { opacity: 0; }
}
#dot-2{
    animation: dot2 1.5s infinite;
}
@keyframes dot2 {
    0% { opacity: 0; }
    50% { opacity: 0; }
    70% { opacity: 1; }
    90% { opacity: 1; }
    100% { opacity: 0; }
}
#dot-3{
    animation: dot3 1.5s infinite;
}
@keyframes dot3 {
    0% { opacity: 0; }
    60% { opacity: 0; }
    80% { opacity: 1; }
    90% { opacity: 1; }
    100% { opacity: 0; }
}

@media screen and (max-width:630px), (orientation: portrait){
	#preloader-text{
		font-size: 5vh;
		letter-spacing: 3px;
	}
}
</style>
