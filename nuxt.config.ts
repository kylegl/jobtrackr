export default defineNuxtConfig({
  build: {
    transpile: ['trpc-nuxt'],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  css: [
    '@unocss/reset/tailwind.css',
  ],
  colorMode: {
    classSuffix: '',
  },
  imports: {
    dirs: [
      'composables/**',
      'server/trpc/schemas',
    ],
  },
})
