<script setup lang="ts">
const { data, isLoading, isFetched } = useEmployeeGetById({ id: 'cldhbu6m3000234dsv2tdgc6m' })

</script>

<template>
  <div v-if="isFetched">
    <ClientOnly>
      <Form :defaultValues="data"/>

    </ClientOnly>
  </div>
</template>
