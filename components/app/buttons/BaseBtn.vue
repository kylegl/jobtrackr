<script setup lang="ts">
const { tooltip, duration, disabled } = defineProps<{
  tooltip?: string
  duration?: number
  disabled?: boolean
}>()
const emit = defineEmits(['click'])
</script>

<template>
  <Btn
    btn btn-hover shadow-md tracking-widest in-out
    active="translate-y-0.5 transition-transform"
    class="group"
    :tooltip="tooltip" :duration="duration" :disabled="disabled" @click="emit('click')"
  >
    <template #content>
      <div flex items-center gap1>
        <slot />
      </div>
    </template>
  </Btn>
</template>
