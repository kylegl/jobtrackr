<script setup lang="ts">
import type { Level } from '@tiptap/extension-heading'
import type { Editor } from '@tiptap/vue-3'
import { InjectionKeyEditorContext } from '~~/constants/symbols'
const { editor } = defineProps<{ editor: Editor }>()

provide(InjectionKeyEditorContext, {
  toggleBold: () => editor?.chain().focus().toggleBold().run(),
  toggleItalic: () => editor?.chain().focus().toggleItalic().run(),
  toggleBulletList: () => editor?.chain().focus().toggleBulletList().run(),
  toggleOrderedList: () => editor?.chain().focus().toggleOrderedList().run(),
  toggleHeading: (level: Level) => editor?.chain().focus().toggleHeading({ level }).run(),
  toggleStrike: () => editor?.chain().focus().toggleStrike().run(),
})
</script>

<template>
  <div inline-flex gap1 px2 py1>
    <BoldBtn />
    <ItalicBtn />
    <StrikeBtn />
    <BulletListBtn />
    <OrderedListBtn />
    <TextBaseBtn />
    <TextLgBtn />
  </div>
</template>
