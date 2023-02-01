<script setup lang="ts">
const emit = defineEmits(['click'])
</script>

<template>
  <Btn
    flex items-center
    :duration="100" tooltip="Delete"
    @click="emit('click')"
  >
    <template #content="{ isClicked }">
      <Icon
        icon-trash op60 hover="text-danger op100" in_out
        :class="{ 'rotate-140 transition-ease-in-out duration-100': isClicked }"
      />
    </template>
  </Btn>
</template>
