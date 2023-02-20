import type { UnwrapRef } from 'vue'
import { computed } from 'vue'
import type { ZodObject, ZodTypeAny } from 'zod'
import type {
  FieldCtx,
  FieldData,
  GetFieldsInput,
  KeyOfSchema,
  UseFormInput,
} from './types'
import { useField } from './useField'
import { hasAny, hasEvery } from './utils'

export function useForm<
  TSchema extends ZodObject<any>,
>({
  fieldsSchema,
  initialValues,
  validator,
}: UseFormInput<TSchema>) {
  const { cloned: clonedInitialValues } = useClonedAsync(initialValues)

  const fields = getFieldsContext({ fieldsSchema, clonedInitialValues, validator })
  const dirtyFields = getDirtyFields(fields)
  const _internalState = {
    submitCount: ref(0),
  } as const

  const state = {
    disabled: ref(false),
    isDirty: computed(() => hasAny('isDirty', true, fields)),
    isLoading: ref(true),
    isSubmitted: ref(false),
    isSubmitting: ref(false),
    isSubmitSuccessful: ref(false),
    isValid: computed(() => hasEvery('isValid', true, fields)),
  } as const

  function onSubmit(cb: () => any) {
    _internalState.submitCount.value++

    return cb()
  }

  function reset() {
    Object.keys(fields).forEach((f) => {
      fields[f as keyof FieldData<TSchema>].reset()
    })
    _internalState.submitCount.value = 0
  }

  return {
    ...state,
    ...fields,
    onSubmit,
    reset,
    dirtyFields,
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

// TODO: fix dirty fields types
export function getDirtyFields<TSchema extends ZodObject<any>>(fields: FieldData<TSchema>) {
  return computed(() => {
    const keys = Object.keys(fields)
    const dirtyFields: Partial<Record<KeyOfSchema<TSchema>, UnwrapRef<FieldCtx['fieldValue']>>> = {}

    for (const key of keys) {
      if (fields[key as KeyOfSchema<TSchema>].isDirty.value && isHasOwn(fields, key))
        (dirtyFields as any)[key] = fields[key].fieldValue.value
    }

    return readonly(dirtyFields)
  })
}

export function isHasOwn<T extends {}>(object: T, key: PropertyKey): key is keyof T {
  return Object.prototype.hasOwnProperty.call(object, key)
}
