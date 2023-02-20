<script setup lang="ts">
import type { MaybeRef } from '@vueuse/core'
import type { NativeFieldValue, RegisterFunction } from '~~/composables/useForm/types'

const props = defineProps<{
  modelValue?: NativeFieldValue
  errorMsg?: string
  register: RegisterFunction
  disabled: MaybeRef<boolean>
}>()
const emit = defineEmits(['update:modelValue'])
const value = useVModel(props, 'modelValue', emit)
</script>

<template>
  <VInput :ref="register" v-model="value" :error-msg="errorMsg" :disabled="disabled" />
</template>
