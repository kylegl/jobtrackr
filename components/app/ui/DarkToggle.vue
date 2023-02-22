<script setup lang="ts">
const color = useColorMode()
useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
})
function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
    <button
      v-tippy="'Light/Dark Mode'"
      icon-btn m-auto
      i-carbon-sun dark:i-carbon-moon
      @click="toggleDark()"
    />
</template>
