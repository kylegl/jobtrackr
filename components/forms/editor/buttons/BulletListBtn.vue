<script setup lang="ts">
const { toggleBulletList } = useEditorContext() || {}
</script>

<template>
  <EditorBtn :callback="toggleBulletList">
    <Icon i-carbon:list-bulleted />
  </EditorBtn>
</template>
