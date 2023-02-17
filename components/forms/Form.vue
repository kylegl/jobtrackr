<script setup lang="ts">
import type { ZodTypeAny } from 'zod'
import { employeeAddInputSchema } from '~~/server/trpc/schemas'
const { defaultValues } = defineProps<{ defaultValues: ZodTypeAny }>()
const { name, disabled } = useForm<typeof employeeAddInputSchema>({
  defaultValues,
  fieldsSchema: employeeAddInputSchema,
  validator: zodValidator,
})

function testFocus() {
  // name.setFocus()
  name.reset()
}
</script>

<template>
  <div>
    <BaseBtn @click="testFocus">
      Focus
    </BaseBtn>
    <FormField
      v-model="name.fieldValue.value"
      :register="name.register" :error-msg="name.errorMsg?.value" :disabled="disabled"
    />
  </div>
</template>
