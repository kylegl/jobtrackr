<script setup lang="ts">
const router = useRouter()

let isVisible = $ref(false)

watchEffect(() => {
  const hasBackRoute = router.options.history.state.back

  if (hasBackRoute)
    isVisible = true
})
</script>

<template>
  <Btn
    v-if="isVisible"
    :duration="50" tooltip="Back"
    flex items-center
    @click="router.go(-1)"
  >
    <template #content>
      <Icon icon-back icon-btn/>
    </template>
  </Btn>
</template>
