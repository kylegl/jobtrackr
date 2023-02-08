<script setup lang="ts">
import type { Delta } from '@vueup/vue-quill'
import { QuillEditor } from '@vueup/vue-quill'
// import type { DeltaInput, EditorInputDataType } from '~/types'
import '~/assets/styles/vue-quill.snow.css'
const props = defineProps < {
  modelValue?: string
  placeholder?: string
  label?: string
  type?: 'html' | 'delta'
}>()

const emit = defineEmits(['update:modelValue'])

// if (!process.server) {
//   const { QuillEditor } = await import('@vueup/vue-quill')
//   const { vueApp } = useNuxtApp()
//   if (!vueApp._context.components.QuillEditor)
//     vueApp.component('QuillEditor', QuillEditor)
// }

const handleUpdate = (value: any) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div>
    <div v-if="label" t5>
      {{ label }}
    </div>
    <ClientOnly>
      <QuillEditor
        input-bg rounded-b border-base
        theme="snow"
        :content="props.modelValue"
        :content-type="type" :options="quillEditorOptions"
        @update:content="handleUpdate"
      />
    </ClientOnly>
  </div>
</template>

