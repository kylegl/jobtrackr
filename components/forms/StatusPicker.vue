<script setup lang="ts">
import type { JobStatusOptions } from '~~/server/schemas'

const props = defineProps<{
  status?: JobStatusOptions
  options: JobStatusOptions[]
  color?: string
  disabled: boolean
}>()
const emit = defineEmits(['update:status'])
const status = useVModel(props, 'status', emit)

// TODO make a map for human readable statuses
const statusOptions = $computed(() => props.options.map(status => ({ label: titleCase(status), value: status })))
// const initVal = statusOptions.find(opt => opt.value === status.value)
// const currVal = $ref(initVal)
// watchEffect(() => {
//   if (currVal !== status)
//     status.value = currVal.value
// })
</script>

<template>
  <div>
    <QuickFade>
      <SelectV2
        v-if="!disabled" v-model:value="status" :list="statusOptions" :disabled="disabled" :clearable="false"
        :searchable="false" bg-1 text-norm border="~ base" rounded min-w-36
      />
      <StatusIndicator v-else rounded p2 m-auto :color="color" :status="status" />
    </QuickFade>
  </div>
</template>
