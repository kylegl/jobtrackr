<script setup lang="ts">
import type { SortKey } from './types'

const { keys, list, disabled } = defineProps<{
  keys: SortKey[]
  list: any[] | undefined
  disabled?: boolean
}>()
const emit = defineEmits(['update:sortedList'])
const sortKeys = $ref(keys)
const activeKey = $computed(() => sortKeys.find(key => key.isActive))
const activeSortKeys = $computed(() => activeKey?.key.split('.'))
const sortDirection = $computed(() => activeKey?.isReverse ? 'desc' : 'asc')
const toggleSort = (key: SortKey) => {
  if (activeKey && activeKey.name !== key.name)
    activeKey.isActive = false

  if (key.isActive)
    key.isReverse = !key.isReverse

  if (!key.isActive)
    key.isActive = true
}

const sortedList = $computed(() => {
  if (!activeKey || !list?.length)
    return list

  return sorter(activeSortKeys!, list, sortDirection)
})

watchEffect(() => emit('update:sortedList', sortedList))
const isActive = (key: SortKey) => key.isActive ? 'btn-active' : 'btn-inactive'
</script>

<template>
  <div>
    <SecondaryBtn
      v-for="key in sortKeys" :key="key.name"
      :class="[isActive(key)]"
      :disabled="disabled"
      @click="toggleSort(key)"
    >
      {{ key.name }}
      <Icon
        v-if="!key.isString"
        i-carbon:arrow-down text-xl my-auto text-fg-muted in_out
        :class="{ 'rotate-180': key.isReverse, 'rotate-0': !key.isReverse }"
      />
      <Icon
        v-if="key.isString"
        text-xl my-auto text-fg-muted in_out
        :class="{ 'i-icons8:alphabetical-sorting-2 rotate-360': key.isReverse, 'i-icons8:alphabetical-sorting  rotate-0': !key.isReverse }"
      />
    </SecondaryBtn>
  </div>
</template>
