<script setup>
useHead({
  title: 'Vitesse Nuxt 3',
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/nuxt.png',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  height: 100%;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #121212;
}
@keyframes rotate {
  from {
    transform-origin: center;
    transform: rotate3d(0, 0, 1, 180deg);
  }

  to {
    transform-origin: center;
    transform: translate3d(0, 0, 0);
  }
}

.animate-rotate {
  animation: rotate 1s linear 1;
  transform-origin: center;
}
</style>
