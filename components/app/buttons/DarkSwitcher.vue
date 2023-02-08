<script setup lang="ts">
const toggleDark = useToggle(isDark)
</script>

<template>
  <button
    v-tippy="'Light/Dark Mode'"
    icon-btn m-auto
    i-carbon-sun dark:i-carbon-moon
    @click="toggleDark()"
  />
</template>
