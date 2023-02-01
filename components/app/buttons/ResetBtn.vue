<script setup lang="ts">
const emit = defineEmits(['click'])
</script>

<template>
  <Btn
    active="animate-spin"
    :duration="100" tooltip="Reset"
    @click="emit('click')"
  >
    <template #content>
      <Icon icon-reset icon-btn />
    </template>
  </Btn>
</template>
