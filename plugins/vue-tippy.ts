import VueTippy from 'vue-tippy'

export default defineNuxtPlugin((nuxt) => {
  const options = {
    tippyDefaults: { delay: 50 },
  }

  nuxt.vueApp.use(VueTippy, options)
})
