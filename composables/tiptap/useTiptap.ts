import type { MaybeRef } from '@vueuse/core'
import type { Editor, JSONContent } from '@tiptap/vue-3'
import { useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

export interface UseTipTapOptions {
  content: Ref<JSONContent | undefined>
  placeholder: string | undefined
  // onSubmit: () => void
  onFocus: () => void
  onBlur: () => void
  autofocus: boolean
  editable: MaybeRef<boolean>
}

export function useTipTap(options: UseTipTapOptions) {
  if (process.server)
    return { editor: ref<Editor | undefined>() }

  const {
    autofocus = false,
    content,
    placeholder,
    editable = true,
  } = options

  const editor = useEditor({
    content: content.value,
    extensions: [
      StarterKit.configure({
        history: false,
        heading: {
          levels: [1, 2],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    editorProps: {
      attributes: {
        class: 'editor',
      },
    },
    onFocus() {
      options.onFocus()
    },
    onBlur() {
      options.onBlur()
    },
    onUpdate({ editor }) {
      content.value = editor.getJSON()
    },
    editable: unref(editable),
  })

  return { editor }
}
