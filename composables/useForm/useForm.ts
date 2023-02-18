import { computed } from 'vue'
import type { ZodObject, ZodTypeAny } from 'zod'
import type {
  FieldData,
  GetFieldsInput,
  KeyOfSchema,
  UseFormInput,
  UseFormOutput,
} from './types'
import { useField } from './useField'
import { hasAny, hasEvery } from './utils'

export function useForm<
  TSchema extends ZodObject<any>,
>({
  fieldsSchema,
  initialValues,
  validator,
}: UseFormInput<TSchema>): UseFormOutput<TSchema> {
  const { cloned: clonedInitialValues } = useClonedAsync(initialValues)

  const fields = getFieldsContext({ fieldsSchema, clonedInitialValues, validator })
  const _internalState = reactive({
    submitCount: 0,
  })

  const state = toRefs({
    disabled: false,
    isDirty: computed(() => hasAny('isDirty', true, fields)),
    isLoading: true,
    isSubmitted: false,
    isSubmitting: false,
    isSubmitSuccessful: false,
    isValid: computed(() => hasEvery('isValid', true, fields)),
  })

  function onSubmit(cb: () => any) {
    _internalState.submitCount++

    return cb()
  }

  function reset() {
    Object.keys(fields).forEach((f) => {
      fields[f as keyof FieldData<TSchema>].reset()
    })
  }
  return {
    ...state,
    ...fields,
    onSubmit,
    fields,
    reset,
  }
}

function getFieldsContext<
  TSchema extends ZodObject<any>,
>({ fieldsSchema, clonedInitialValues, validator }: GetFieldsInput<TSchema>) {
  const fieldCtxMap = Object.keys(fieldsSchema.shape)
    .reduce<FieldData<TSchema>>((acc, key) => {
      const defaultValue = computed(() => clonedInitialValues.value?.[key])
      const schema = fieldsSchema.shape[key] as ZodTypeAny
      const fieldCtx = useField({
        defaultValue,
        options: {
          validation: {
            callback: validator,
            schema,
          },
        },
      })

      acc[key as KeyOfSchema<TSchema>] = fieldCtx
      return acc
    }, {} as FieldData<TSchema>)
  return fieldCtxMap
}
