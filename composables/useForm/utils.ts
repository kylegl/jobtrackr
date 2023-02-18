import type { ZodObject } from 'zod'
import type { MaybeRef } from '@vueuse/core'
import type { Ref } from 'vue'
import { isReactive, isRef, unref } from 'vue'
import type { ReactiveVariable } from 'vue/macros'
import type { FieldData, NativeFieldValue, WatchAndCloneOptions } from './types'

export function hasAny<
  TSchema extends ZodObject<any>,
  T extends MaybeRef<FieldData<TSchema>>,
  K extends keyof T,
  P extends keyof T[K],
  V extends NativeFieldValue,
>(key: P, val: V, obj: T) {
  const keys = Object.keys(obj) as K[]

  return keys.some(k => unref(obj[k]?.[key]) === val)
}

export function hasEvery<
  TSchema extends ZodObject<any>,
  T extends MaybeRef<FieldData<TSchema>>,
  K extends keyof T,
  P extends keyof T[K],
  V extends NativeFieldValue,
>(key: P, val: V, obj: T) {
  const keys = Object.keys(obj) as K[]

  return keys.every(k => unref(obj[k]?.[key]) === val)
}

export function unReactify<T>(val: ReactiveVariable<T> | Ref<T> | T) {
  if (isRef(val))
    return val.value

  if (isReactive(val))
    return JSON.parse(JSON.stringify(val))

  return val
}

export function useWatchAndClone<T>(
  source: MaybeRef<T> | ReactiveVariable<T>,
  target: Ref<T>,
  options: WatchAndCloneOptions<T>,
  syncTarget?: Ref<() => void | undefined>,
) {
  const {
    cloneFn = (val: T) => ({ ...val }),
  } = options

  if (!source)
    return

  const watchSource = isRef(source) ? source : () => source

  watch(watchSource, () => {
    const rawSource = unReactify(source)

    target.value = cloneFn(rawSource)

    // sync function
    if (isRef(syncTarget)) {
      syncTarget.value = () => {
        target.value = cloneFn(rawSource)
      }
    }
  },
  {
    ...options,
    onTrigger(e) {
      debugger
    },
  })
}
