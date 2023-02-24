import type { EditorCommands } from '~~/composables/types'

// eslint-disable-next-line symbol-description
export const InjectionKeyEditorContext = Symbol() as InjectionKey<Partial<EditorCommands>>
