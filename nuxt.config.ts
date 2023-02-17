export default defineNuxtConfig({
  typescript: {
    tsConfig: {
      vueCompilerOptions: {
        jsxTemplates: true,
        experimentalRfc436: true,
      },
    },
  },
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
    '@vue-macros/nuxt',
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
