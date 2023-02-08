<script setup lang="ts">
import Fuse from 'fuse.js'
const { data, keys, disabled } = defineProps<{
  data: any[]
  keys: string[]
  disabled?: boolean
}>()

const emit = defineEmits(['update:results'])

const options = {
  minMatchCharLength: 1,
  threshold: 0.3,
  keys,
}

const searchValue = $ref('')
const fuse = $computed(() => new Fuse(data, options))
const searchResult = $computed(() => {
  if (searchValue === '')
    return data
  return fuse.search(searchValue)
    ?.map((result) => {
      return result.item
    })
})
</script>

<template>
  <div>
    <TextInput
      v-model="searchValue"
      type="text"
      place-holder-text="Search..."
      @keydown.enter="emit('update:results', searchResult)"
      @input="emit('update:results', searchResult)"
      :disabled="disabled"
    >
      <template #after>
        <button class="flex" @click="true">
          <Icon icon-search fluent-search-12-regular icon-btn m-auto  mx2 />
        </button>
      </template>
    </TextInput>
  </div>
</template>
