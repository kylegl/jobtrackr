<script setup lang="ts">
const emit = defineEmits(['click'])
</script>

<template>
  <ConfirmBtn
    tooltip="Add Task"
    @click="emit('click')"
    flex items-center
  >
    <Icon icon-add />
    <span>Add</span>
  </ConfirmBtn>
</template>
