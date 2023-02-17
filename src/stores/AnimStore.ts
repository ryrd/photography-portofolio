import {defineStore} from 'pinia'

export const useAnimStore = defineStore('startAnim', {
    state: () => ({
        modelLoaded : false,
        preloaderDone : false,
    }),
    actions:  {
        modelDoneSignal() {
            this.modelLoaded = true
        },
        preloaderDoneSignal() {
            this.preloaderDone = true
        },
    }
})