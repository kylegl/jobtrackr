<script setup lang="ts">
const { callback } = defineProps<{ callback: () => void }>()
const { isActive } = defineModel<{ isActive?: boolean }>()
const toggleActive = useToggle(isActive)

function toggleEffect() {
  toggleActive()
  callback()
}
</script>

<template>
  <Btn
    h8 w8 rounded-lg in-out
    :class="[isActive ? 'bg-op-90 ' : 'op40']"
    @click="toggleEffect"
  >
    <template #content>
      <slot />
    </template>
  </Btn>
</template>
