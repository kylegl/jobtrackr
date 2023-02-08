<script setup lang="ts">
const { disabled } = defineProps<{ disabled: boolean }>()
const router = useRouter()

function handleNewWorkOrder() {
  router.push({ name: 'workorders-id', params: { id: 'new' } })
}
</script>

<template>
  <PrimaryBtn :disabled="disabled" :click-animation="true" @click="handleNewWorkOrder">
    <Icon icon-add icon-btn />
    Work Order
  </PrimaryBtn>
</template>
