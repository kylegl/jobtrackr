<script setup lang="ts">
const { tooltip, duration } = defineProps<{ tooltip?: string; duration?: number }>()
const emit = defineEmits(['click'])
</script>

<template>
  <BaseBtn
    border-base bg-bg-lit-a dark:bg-bg-drk-b text-norm op90
    :tooltip="tooltip" :duration="duration"
    @click="emit('click')"
  >
    <slot />
  </BaseBtn>
</template>
