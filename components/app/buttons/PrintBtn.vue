<script setup lang="ts">
const emit = defineEmits(['click'])
</script>

<template>
  <Btn
    tooltip="Print"
    flex items-center
    @click="emit('click')"
  >
    <template #content="{ isClicked }">
      <Icon
        icon-print icon-btn
        :class="{ 'animate-flash animate-faster': isClicked }"
      />
    </template>
  </Btn>
</template>
