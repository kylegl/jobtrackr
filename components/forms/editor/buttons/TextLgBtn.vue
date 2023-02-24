<script setup lang="ts">
const { toggleHeading, textIsLarge } = useEditorContext() || {}

function toggleH1() {
  toggleHeading?.(3)
  textIsLarge!.value = true
}
</script>

<template>
  <EditorBtn :callback="toggleH1" :isActive="textIsLarge">
    <Icon i-carbon:text-font text-lg />
  </EditorBtn>
</template>
