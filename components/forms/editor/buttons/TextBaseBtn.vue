<script setup lang="ts">
const { toggleHeading } = useEditorContext() || {}
const { isLarge } = useTextSize()

function toggleH1() {
  toggleHeading?.(4)
  isLarge.value = false
}
</script>

<template>
  <EditorBtn :callback="toggleH1" :isActive="!isLarge">
    <Icon i-carbon:text-font text-base />
  </EditorBtn>
</template>
