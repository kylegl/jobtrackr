<script setup lang="ts">
const isLoading = true
const searchResults = $ref([])

// const rawWos = $computed(() => workOrders ?? [])
// const wos = $computed(() => searchResults?.length ? searchResults : rawWos)
const filteredWos = $ref([])
const sortedWos = $ref([])

// function focusIt() {
//   console.log('preFocusValue', focused.value)
//   focused.value = !focused.value
//   console.log('isFocused', focused.value)
// }

// function setModelValue() {
//   // firstName.error = 'you fucked up'
//   testErr = 'you fucked up'
//   firstName?.setFocus()
// }

// watchEffect(() => {
//   console.log('value', firstName?.val)
//   console.log(focused.value)
// })
</script>

<template>
  <div flex="~ col" gap8 w-full relative>
    <h1 t3 heading>
      Work Orders
    </h1>
    <section flex="~ col" gap4 w-full>
      <div flex justify-between>
        <SearchWos v-model:searchResults="searchResults" />

        <NewWorkOrder :disabled="isLoading" />
      </div>

      <div flex gap2 items-center w-full flex-wrap justify-between>
        <div flex gap2>
          <Icon i-mdi:filter text-2xl my-auto op60 />
          <Filter
            v-model:filteredData="filteredWos" :filter-list="woFilters" :data="searchResults" :disabled="isLoading" flex
            gap2
          />
        </div>

        <div flex gap2>
          <Icon i-mdi:sort text-2xl my-auto op60 />
          <Sort
            v-if="filteredWos" v-model:sortedList="sortedWos" :list="filteredWos" :keys="woSortKeys"
            :disabled="isLoading" flex gap2
          />
        </div>
      </div>

      <Divider w="full" h=".25" />
    </section>
    <BaseBtn @click="'hi'">
      <ToolTip placement="bottom" content="HELLO">
        <div>
          submit
        </div>
      </ToolTip>
    </BaseBtn>

    <!-- <section>
      <Loading v-if="isLoading" absolute-center />
      <div v-else-if="isError">
        There was a problem getting the Work Orders...
      </div>
      <div v-else>
        <SlideGroup v-if="wos" flex="~ col" gap2>
          <Workorder v-for="wo in sortedWos" :key="wo?.id" :workorder="wo" />
        </SlideGroup>
      </div>
    </section> -->
  </div>
</template>
