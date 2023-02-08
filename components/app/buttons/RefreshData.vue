<script setup lang="ts">

</script>

<template>
  <button
    v-tippy="'Refresh Data'"
    icon-btn text-2xl m-auto icon-refresh
    :class="{ 'animate-rotate animate-reverse animate-count-infinite': '' }"
    transition-ease-in-out duration-200
  />
</template>
