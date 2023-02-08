<script setup lang="ts">
import { employeeAddInputSchema } from '~~/server/trpc/schemas'
// const { defaultValues } = $defineProps<{ defaultValues: ZodTypeAny }>()
const {
  data: defaultValues,
  isLoading, isFetched,
} = useEmployeeGetById({ id: 'cldhbu6m3000234dsv2tdgc6m' })

const {
  name,
  disabled,
  initValues,
  fields,
} = useForm<typeof employeeAddInputSchema>({
  defaultValues,
  fieldsSchema: employeeAddInputSchema,
  validator: zodValidator,
})

function testFocus() {
  // name.setFocus()
  // name?.reset()
}
</script>

<template>
  <div>
    {{ defaultValues }}
    <BaseBtn @click="testFocus">
      Focus
    </BaseBtn>
    <FormField
      v-if="isFetched"
      v-model="name.fieldValue.value"
      :register="name.register" :error-msg="name.errorMsg?.value" :disabled="disabled"
    />
  </div>
</template>
