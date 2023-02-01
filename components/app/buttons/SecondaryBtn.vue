<script setup lang="ts">
const { tooltip, duration } = defineProps<{
  tooltip?: string
  duration?: number
}>()
const emit = defineEmits(['click'])
</script>

<template>
  <div>
    <BaseBtn
      border-base bg-bg-drk-c dark:bg-fg-drk-muted op90
      text-fg-drk-norm dark:text-fg-lit-muted
      :tooltip="tooltip" :duration="duration"
      @click="emit('click')"
    >
      <slot />
    </BaseBtn>
  </div>
</template>
