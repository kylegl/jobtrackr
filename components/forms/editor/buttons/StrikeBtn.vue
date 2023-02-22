<script setup lang="ts">
const { toggleStrike } = useEditorContext() || {}
</script>

<template>
  <EditorBtn :callback="toggleStrike">
    <Icon i-carbon:text-strikethrough />
  </EditorBtn>
</template>
