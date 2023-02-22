<script setup lang="ts">
const { toggleOrderedList } = useEditorContext() || {}
</script>

<template>
  <EditorBtn :callback="toggleOrderedList">
    <Icon i-carbon:list-numbered />
  </EditorBtn>
</template>
