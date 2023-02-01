<script setup lang="ts">
const { to } = defineProps<{
  to: string
  title?: string
  icon: string
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    no-underline flex gap-x-2 action-hover
    t5 click-heading
  >
    <Icon :class="icon" text-2xl />{{ title }}
  </NuxtLink>
</template>
