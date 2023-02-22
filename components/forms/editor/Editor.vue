<script setup lang="ts">
import type { JSONContent } from '@tiptap/vue-3'
import { EditorContent } from '@tiptap/vue-3'
const { placeholder, autofocus, disabled, onFocus, onBlur } = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  autofocus?: boolean
  disabled: boolean
  onFocus?: () => void
  onBlur?: () => void
}>(), {
  autofocus: false,
  onFocus: () => { },
  onBlur: () => { },
})

const content = ref<JSONContent>()
const { editor } = useTipTap({
  content,
  placeholder,
  autofocus,
  editable: !disabled,
  onFocus,
  onBlur,
})

watch(editor, () => {
  if (!editor.value)
    return

  content.value = editor.value.getJSON()
})
</script>

<template>
  <div flex="~ col" b-base rounded-lg>
    <EditorButtons :editor="editor" b-base-b/>
    <EditorContent :editor="editor" bg-litDrk-4 rounded-b-lg/>
  </div>
</template>

<style>
ul,
ol {
  padding: 0 1rem;
}

ol {
  list-style-type: decimal;
}

ul {
  list-style-type: disc;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.5rem;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>
