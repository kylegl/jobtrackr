<script setup lang="ts">
const { toggleBold } = useEditorContext() || {}
</script>

<template>
  <EditorBtn :callback="toggleBold">
    <Icon i-carbon:text-bold />
  </EditorBtn>
</template>
