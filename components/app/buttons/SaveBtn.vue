<script setup lang="ts">
const emit = defineEmits(['click'])
</script>

<template>
  <div>
    <Btn
      active="translate-y-0.5 transition-transform"
      :duration="100" tooltip="Save"
      @click="emit('click')"
    >
      <template #content>
        <Icon icon-save icon-btn my-auto />
      </template>
    </Btn>
  </div>
</template>
