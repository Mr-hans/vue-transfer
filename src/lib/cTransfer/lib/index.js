import keyboard from './cTransfer'
const cTransfer = {
    install (Vue, options) {
        Vue.component('cTransfer', keyboard)
    }
}

export default cTransfer