<script setup lang="ts">
const props = defineProps<{ searchResults: Array<any> }>()
const emit = defineEmits(['update:searchResults'])
const results = useVModel(props, 'searchResults', emit)
const { isLoading, data: workOrders, isError } = useWorkOrderList({})
</script>

<template>
  <div>
    <div v-if="Array.isArray(workOrders)">
      <!-- <Search
        v-if="workOrders?.length"
        v-model:results="results" :disabled="isLoading" :data="workOrders" :keys="woSearchKeys" w="1/2" min-w-xs
        max-w-75
        /> -->
      </div>
    </div>
</template>
