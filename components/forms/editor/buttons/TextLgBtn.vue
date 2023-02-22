<script setup lang="ts">
const { toggleHeading } = useEditorContext() || {}
const { isLarge } = useTextSize()

function toggleH1() {
  toggleHeading?.(3)
  isLarge.value = true
}
</script>

<template>
  <EditorBtn :callback="toggleH1" :isActive="isLarge">
    <Icon i-carbon:text-font text-lg />
  </EditorBtn>
</template>
