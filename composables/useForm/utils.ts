import type { ZodObject } from 'zod'
import type { MaybeComputedRef, MaybeRef } from '@vueuse/core'
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

export function cloneFnObjAssign<T>(source: T): T {
  return Object.assign({}, source)
}

export function useClonedAsync<T>(
  source: MaybeComputedRef<T>,
  options: WatchAndCloneOptions<T> = {},
) {
  const {
    cloneFn = cloneFnObjAssign,
    deep = true,
    immediate = true,
  } = options
  const cloned = ref<T>({} as T)

  function sync() {
    if (!unref(source))
      return

    cloned.value = cloneFn(unref(source))
  }

  // watch source for ref or proxy
  const watchSource = isRef(source) ? source : () => source

  watch(watchSource, sync, {
    ...options,
    deep,
    immediate,
    // onTrigger(e) {
    //   debugger
    // },
  })

  return { cloned, sync }
}
