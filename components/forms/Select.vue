<script setup lang="ts">
import type { UseFuseOptions } from '@vueuse/integrations/useFuse'
import { useFuse } from '@vueuse/integrations/useFuse'
import 'vue-select/dist/vue-select.css'
const props = withDefaults(defineProps<{
  label?: string
  list?: Array<any>
  modelValue: any
  searchKeys?: string[]
  optionLabel?: string
  multiple?: boolean
  taggable?: boolean
  disabled?: boolean
  pushTags?: boolean
  clearable?: boolean
  searchable?: boolean
  getOptionLabel?: (...args: any[]) => string
  reduce?: (...args: any[]) => any
  createOption?: <T>(...args: any[]) => T
}>(), {
  multiple: false,
  taggable: false,
  disabled: false,
  pushTags: false,
  clearable: false,
  searchable: false,
})

const emit = defineEmits(['update:modelValue', 'selected', 'deselected', 'created'])

const value = useVModel(props, 'modelValue', emit)

function handleOptionCreated<T extends typeof props['createOption']>(val: T): void {
  emit('created', val)
}

const fuseOptions = $computed<UseFuseOptions<typeof value>>(() => getFuseOptions(props.searchKeys))
function fuseSearch(options: any, search: any) {
  const { results } = useFuse(search, options, fuseOptions)
  return search.length ? results.value.map(item => item.item) : options
}
const attrs = useAttrs()
</script>

<template>
  <div>
    <label v-if="label" t5> {{ label }}</label>
    <v-select id="select" ref="select" v-model="value" input-base input-shadow w-full p2 border-base
      :class="attrs.class" :filter="fuseSearch" :label="optionLabel" :options="list" :multiple="multiple"
      :taggable="taggable" :push-tags="pushTags" :disabled="disabled" :clearable="clearable" :searchable="searchable"
      :reduce="reduce" :create-option="createOption" :get-option-label="getOptionLabel"
      @option:selected="emit('selected')" @option:deselected="emit('deselected')" @option:created="handleOptionCreated">
      <template #option="option">
        <slot name="option" :option="option" />
      </template>
      <template #open-indicator="{ attributes }">
        <Icon v-bind="attributes" i-fa:chevron-down />
      </template>
    </v-select>
  </div>
</template>

<style>
#select button:disabled {
  display: none
}

.vs__dropdown-menu {
  width: min-content;
  max-width: 89vw;
  --at-apply: "input-base shadow-md dropdown-border rounded";
}

.vs__selected {
  padding: 0;
  border: 0;
  margin: 0;
  color: inherit;
  --at-apply: "bubble shadow-md flex justify-center"
}

.v-select.vs--single.vs--unsearchable.vs--open .vs__selected {
  --at-apply: "input-bg"
}

.vs__search {
  --at-apply: "input-base m0"
}

.vs__deselect {
  --at-apply: "icon-btn fill-norm m0 px1"
}

.vs__dropdown-toggle {
  --at-apply: "input-base m0 p0 b-0";
}

.vs__selected-options {
  padding: 0;
  --at-apply: "text-norm"
}

/* :root {
  --vs-dropdown-bg: #FAFAFA;
  --vs-dropdown-option--active-bg: #e4e4e7;
  --vs-dropdown-option--active-color: #18181b;
  --vs-border-color: transparent;
 */
/* } */
</style>
