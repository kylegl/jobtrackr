<script setup lang="ts">
import type { MaybeRef } from '@vueuse/core'
import type { NativeFieldValue } from '~/composables/useForm/types'

const props = withDefaults(defineProps<{
  modelValue?: NativeFieldValue
  placeholder?: string
  disabled?: MaybeRef<boolean>
  label?: string
  type?: string
  error?: boolean
  errorMsg?: string
  dirty?: boolean
  flag?: string
  attrs?: any
}>(), {
  disabled: false,
  type: 'text',
})

const emit = defineEmits(['update:model-value', 'update:errorMsg', 'enter', 'focus', 'blur'])
const input = $ref<HTMLInputElement | null>(null)

const val = $(useVModel(props, 'modelValue', emit, { passive: true, deep: true }))
const errorMsg = useVModel(props, 'errorMsg', emit, { passive: true })

defineExpose({
  input: $$(input),
})
</script>

<template>
  <div min-w-60>
    <div flex gap2>
      <label v-if="label" :class="error ? 'label-text-error' : 'label-text'"> {{ label }}</label>
      <div v-if="flag" text-sm text-brandBlue text-op-50 ml-auto self-end>
        {{ flag }}
      </div>
    </div>
    <div flex gap2 max-h-fit border-input in-out p2 :class="attrs" bg-zinc-600 rounded-lg>
      <slot name="before" />
      <input
        ref="input" v-model="val" w-full bg-transparent in-out placeholder:t-brand1 placeholder:text-op-40
        class="focus:outline-none" :placeholder="placeholder" :type="type" :disabled="unref(disabled)"
        @keydown.enter="emit('enter')" @focus="emit('focus')" @blur="emit('blur')"
      >
      <slot name="after" />
    </div>
    <div text-sm text-red h-4>
      {{ errorMsg }}
    </div>
  </div>
</template>
