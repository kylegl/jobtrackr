<script setup lang="ts">
const emit = defineEmits(['click'])
</script>

<template>
  <Btn @click="emit('click')">
    <template #content>
      <Icon icon-x icon-btn />
    </template>
  </Btn>
</template>
