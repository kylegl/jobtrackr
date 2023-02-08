<script setup lang="ts">
const { tooltip } = defineProps<{ tooltip?: string }>()
const emit = defineEmits(['click'])
</script>

<template>
  <BaseBtn
    border-base bg-danger op90 px2 py1
    text-fg-lit-norm
    :tooltip="tooltip"
    @click="emit('click')"
  >
    <slot />
  </BaseBtn>
</template>
