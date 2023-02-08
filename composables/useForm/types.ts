import type { CloneFn, MaybeRef } from '@vueuse/core'
import type { ComputedRef, Ref, WatchOptions } from 'vue'
import type { ZodObject, ZodTypeAny } from 'zod'

export type KeyOfSchema<T extends ZodObject<any>> = T extends ZodObject<infer O> ? keyof O : never
export type FieldData<T extends ZodObject<any>> = { [K in KeyOfSchema<T>]: FieldCtx }

export interface UseFormInput<T extends ZodObject<any, any, any>> {
  fieldsSchema: T
  initialValues?: MaybeRef<FieldValues>
  validator: ValidationFn
}

export interface GetFieldsInput<T extends ZodObject<any>> {
  fieldsSchema: T
  clonedInitialValues: MaybeRef<FieldValues>
  validator: ValidationFn
}

export interface FormState {
  isValid: ComputedRef<boolean>
  isLoading: boolean
  isSubmitted: boolean
  isSubmitting: boolean
  isSubmitSuccessful: boolean
  disabled: boolean
  isDirty: ComputedRef<boolean>
}

export interface InternalFormState {
  submitCount: number
}

export type PublicFormCtx<
  TSchema extends ZodObject<any>,
  T extends FormState,
  K extends keyof T,
  > = Record<K, Ref<T[K]>> & FieldData<TSchema>

export interface UseFormFuncs {
  onSubmit: (cb: () => any) => void
  reset: () => void
}

export type UseFormOutput<
  TSchema extends ZodObject<any>,
  > = UseFormFuncs & PublicFormCtx<
    TSchema,
    FormState,
    keyof FormState
  >

export type OnSubmitFn = (cb: () => any) => () => any

export interface UseFieldInput<TSchema extends ZodObject<any>> {
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
