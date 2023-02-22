import type { Level } from '@tiptap/extension-heading'

export interface EditorCommands {
  toggleBold: () => void
  toggleItalic: () => void
  toggleBulletList: () => void
  toggleOrderedList: () => void
  toggleHeading: (level: Level) => void
  toggleStrike: () => void
}
