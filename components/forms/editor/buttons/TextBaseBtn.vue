<script setup lang="ts">
const { textIsLarge, toggleHeading } = useEditorContext() || {}

function toggleH1() {
  toggleHeading?.(4)
  textIsLarge!.value = false
}
</script>

<template>
  <EditorBtn :callback="toggleH1" :isActive="!textIsLarge">
    <Icon i-carbon:text-font text-base />
  </EditorBtn>
</template>
