<script setup lang="ts">
import { z } from 'zod'
import { zodValidator } from '~~/composables/useForm'
// import { employeeAddInputSchema } from '~~/server/trpc/router/routes/employeeRouter'
const { data } = useEmployeeGetById({ id: 'cldhbu6m3000234dsv2tdgc6m' })

const { name, disabled } = useForm({
  defaultValues: data?.value,
  fieldsSchema: z.object({
    name: z.string(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    title: z.string().optional(),
    titleId: z.string().cuid().optional(),
    isEmployed: z.boolean(),
  }),
  validator: zodValidator,
})
</script>

<template>
  <div>
    <FormField
      v-model="name.fieldValue.value"
      :register="name.register" :error-msg="name.errorMsg?.value" :disabled="disabled"
    />
  </div>
</template>
