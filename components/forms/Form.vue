<script setup lang="ts">
import { employeeAddInputSchema } from '~~/server/trpc/schemas'
const { data, isLoading } = useEmployeeGetById({ id: 'cldhbu6m3000234dsv2tdgc6m' })

const { name, disabled } = useForm<typeof employeeAddInputSchema>({
  defaultValues: data?.value,
  fieldsSchema: employeeAddInputSchema,
  validator: zodValidator,
})
</script>

<template>
  <div v-if="!isLoading">
    {{ data }}
    <FormField
      v-model="name.fieldValue.value"
      :register="name.register" :error-msg="name.errorMsg?.value" :disabled="disabled"
    />
  </div>
</template>
