import vSelect from 'vue-select'

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.component('VSelect', vSelect)
})
