import type { CloneFn, MaybeRef } from '@vueuse/core'
import type { ComputedRef, Ref, WatchOptions } from 'vue'
import type { ZodObject, ZodTypeAny } from 'zod'

export type KeyOfSchema<T extends ZodObject<any>> = T extends ZodObject<infer O> ? keyof O : never
export type FieldData<T extends ZodObject<any>> = { [K in KeyOfSchema<T>]: FieldCtx }

export interface UseFormInput<TSchema extends ZodObject<any, any, any>> {
  fieldsSchema: TSchema
  initialValues?: MaybeRef<FieldValues>
  validator: ValidationFn
}

export interface GetFieldsInput<TSchema extends ZodObject<any>> {
  fieldsSchema: TSchema
  clonedInitialValues: MaybeRef<FieldValues>
  validator: ValidationFn
}

export interface FormState {
  isValid: ComputedRef<boolean>
  isLoading: Ref<boolean>
  isSubmitted: Ref<boolean>
  isSubmitting: Ref<boolean>
  isSubmitSuccessful: Ref<boolean>
  disabled: Ref<boolean>
  isDirty: ComputedRef<boolean>
}

export interface InternalFormState {
  submitCount: Ref<number>
}

export interface UseFormFuncs {
  onSubmit: (cb: () => any) => void
  reset: () => void
}

// export interface UseFormOutput<TSchema extends ZodObject<any>>
//   extends UseFormFuncs {
//   dirtyFields: ReturnType<typeof getDirtyFields>
//   & FieldData<TSchema>
// }

export type DirtyFields<TSchema extends ZodObject<any>> = ComputedRef<Record<KeyOfSchema<TSchema>, NativeFieldValue>> | {}

export type OnSubmitFn = (cb: () => any) => () => any

export interface UseFieldInput {
  fieldName?: string
  defaultValue?: MaybeRef<NativeFieldValue>
  ctx?: FormState
  options: UseFieldOptions

}

export interface UseFieldOptions {
  validation: UseValidatorInput
}
export interface FormElement extends Partial<HTMLDivElement> {
  value: NativeFieldValue
  errorMsg?: string
  setFocus?: () => void
  input?: FieldElement
}

export type InternalFieldName = string

export type FieldElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | HTMLDivElement

export type FieldValue<TFieldValues extends FieldValues> =
  TFieldValues[InternalFieldName]

export type FieldValues = Record<string, any>

export type NativeFieldValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | unknown[]

export interface FieldCtx {
  isDirty: Ref<boolean>
  isTouched: Ref<boolean>
  isValid: Ref<boolean>
  register: RegisterFunction
  reset: () => void
  setFocus: () => void
  fieldValue: Ref<NativeFieldValue>
  errorMsg?: ComputedRef<string | undefined>
}

export type RegisterInput = FormElement | FieldElement | null

export type RegisterFunction = (el: RegisterInput) => Ref<FieldElement | null> | undefined

export interface ZodValidateFieldInput {
  value: MaybeRef<NativeFieldValue>
  schema?: ZodTypeAny
}

export interface UseValidatorInput {
  value?: MaybeRef<NativeFieldValue>
  showErrorEvent?: string
  callback: ValidationFn
  schema: ZodTypeAny
  validate?: MaybeRef<boolean>
}

interface ValidationResult {
  msg?: string
  success: boolean
}

export type ValidationFn = (...args: any[]) => ValidationResult

export interface WatchAndCloneOptions<T> extends WatchOptions {
  cloneFn?: CloneOrTransformFn<T>
}

type CloneOrTransformFn<T> = TransformFn | CloneFn<T>

type TransformFn = <T>() => T
