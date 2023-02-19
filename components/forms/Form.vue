<script setup lang="ts">
import { employeeAddInputSchema } from '~~/server/trpc/schemas'
// const { defaultValues } = $defineProps<{ defaultValues: ZodTypeAny }>()
const {
  data: initialValues,
  isLoading, isFetched,
} = useEmployeeGetById({ id: 'clecc2t87000034rvv6318rgo' })

const { mutateAsync } = useEmployeeUpdate()

const {
  isEmployed,
  email,
  phone,
  name,
  title,
  disabled,
  reset,
  isDirty,
  isValid,
  dirtyFields,
  onSubmit,
} = useForm<typeof employeeAddInputSchema>({
  initialValues,
  fieldsSchema: employeeAddInputSchema,
  validator: zodValidator,
})

function handleSubmit() {
  onSubmit(async () => mutateAsync({
    id: 'clecc2t87000034rvv6318rgo',
    ...dirtyFields,
  }))
}

function testFocus() {
  name.setFocus()
}
</script>

<template>
  <div>
    <div flex="~ col" gap2>
      <div>
        dirty: {{ isDirty }}
      </div>
    </div>
    <BaseBtn @click="testFocus">
      Focus
    </BaseBtn>
    <BaseBtn @click="reset">
      Reset
    </BaseBtn>
    <BaseBtn @click="disabled = true">
      disable
    </BaseBtn>
    <FormField
      v-model="name.fieldValue.value"
      :register="name.register" :error-msg="name.errorMsg?.value" :disabled="disabled"
    />
    <FormField
      v-model="email.fieldValue.value"
      :register="email.register" :error-msg="email.errorMsg?.value" :disabled="disabled"
    />
    <FormField
      v-model="phone.fieldValue.value"
      :register="phone.register" :error-msg="phone.errorMsg?.value" :disabled="disabled"
    />
    <input
      v-model="isEmployed.fieldValue.value"
      :register="isEmployed.register" type="checkbox" :disabled="disabled"
    >
    <BaseBtn :disabled="!isValid || !isDirty" @click="handleSubmit">
      Submit
    </BaseBtn>
  </div>
</template>
