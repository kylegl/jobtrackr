import { useFocus } from '@vueuse/core'
import type { MaybeElementRef, UseFocusOptions } from '@vueuse/core'
import type { UseFieldFocusInput } from './useFocus'

export interface UseFieldFocusInput<T extends FocusWrapperOptions> {
  createFocusControl?: FocusControlWrapper<T>
  options: T
}

export interface UseFieldFocusReturn {
  focused: Ref<boolean>
}

export interface FocusControl {
  blur: () => void
  focus: () => void
}

export interface FocusWrapperOptions {
  initialValue?: boolean
}

export type FocusControlWrapper<
  T extends FocusWrapperOptions,
  > = (input: T) => FocusControl

interface UseFocusWrapperInput extends UseFocusOptions {
  target: MaybeElementRef
}

const useFocusWrapper: FocusControlWrapper<UseFocusWrapperInput> = (input) => {
  const { target, initialValue } = input
  const { focused } = useFocus(target, { initialValue })
  return {
    blur() {
      focused.value = false
    },
    focus() {
      focused.value = true
    },
  }
}

export interface EditorFocusWrapperInput extends FocusWrapperOptions {
  focus: () => void
  blur: () => void
}

export const useEditorFocusWrapper: FocusControlWrapper<EditorFocusWrapperInput> = ({ focus, blur, initialValue }) => {
  return {
    blur,
    focus,
  }
}

export function useFieldFocus<
  T extends FocusWrapperOptions,
  >(input: UseFieldFocusInput<T>): UseFieldFocusReturn {
  const {
    createFocusControl = useFocusWrapper,
    options,
  } = input

  const innerFocused = ref(false)
  const focusControl = createFocusControl!(options)

  const focused = computed({
    get: () => innerFocused.value,
    set: (value: boolean) => {
      if (!value && innerFocused.value)
        focusControl.blur()
      else if (value && !innerFocused.value)
        focusControl.focus()
    },
  })

  return { focused }
}
