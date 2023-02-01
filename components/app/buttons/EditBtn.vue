<script setup lang="ts">
const emit = defineEmits(['click'])
</script>

<template>
  <Btn
    tooltip="Edit"
    :duration="50"
    active="translate-y-0.5 transition-transform"
    @click="emit('click')"
  >
    <template #content>
      <Icon icon-edit icon-btn />
    </template>
  </Btn>
</template>
