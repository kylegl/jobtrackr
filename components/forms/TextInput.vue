<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string | number | null
  placeHolderText?: string
  disabled?: boolean
  label?: string
  type?: string
}>(), {
  disabled: false,
  type: 'text',
})

const emit = defineEmits(['update:modelValue', 'enter', 'focus', 'blur'])

const val = $(useVModel(props, 'modelValue', emit, { passive: true }))
</script>

<template>
  <div>
    <label v-if="label" t5> {{ label }}</label>
    <div flex gap2 max-h-fit input-base input-shadow border-base rounded in_out p2>
      <slot name="before" />
      <input
        v-model="val" w-full input-base rounded placeholder:text-subtle in_out class="focus:outline-none"
        :placeholder="placeHolderText" :type="type" :disabled="disabled" @keydown.enter="emit('enter')"
        @focus="emit('focus')" @blur="emit('blur')"
      >
      <slot name="after" />
    </div>
    <slot name="error" />
  </div>
</template>
