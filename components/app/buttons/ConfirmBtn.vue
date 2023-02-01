<script setup lang="ts">
const { tooltip } = defineProps<{ tooltip?: string }>()
const emit = defineEmits(['click'])
</script>

<template>
  <BaseBtn
    border-base bg-success op90 py1 px2
    text-fg-lit-norm
    class="group"
    :tooltip="tooltip"
    @click="emit('click')"
  >
    <slot />
  </BaseBtn>
</template>
