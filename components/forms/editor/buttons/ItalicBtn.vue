<script setup lang="ts">
const { toggleItalic } = useEditorContext() || {}
</script>

<template>
  <EditorBtn :callback="toggleItalic">
    <Icon i-carbon:text-italic />
  </EditorBtn>
</template>
