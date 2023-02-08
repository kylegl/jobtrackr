<script setup lang="ts">
import type { JobStatusOptions } from '~~/server/schemas'

const props = defineProps<{
  status?: JobStatusOptions
  startAt?: string
  hasEmployee?: boolean
  disabled: boolean
}>()
const emit = defineEmits(['update:status'])
const updatedStatus = useVModel(props, 'status', emit)
</script>

<template>
  <StatusPicker v-model:status="updatedStatus" :options="jobStatusOptions" :disabled="disabled" w32 />
</template>
