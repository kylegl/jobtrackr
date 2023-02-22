import { InjectionKeyEditorContext } from '~/constants/symbols'

export function useEditorContext() {
  return inject(InjectionKeyEditorContext, undefined)
}
