'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, useMemo } from 'react'

interface RichTextEditorProps {
  value?: string
  content?: string
  onChange: (value: string) => void
  label?: string
}

export default function RichTextEditor({ value, content, onChange, label = 'Description' }: RichTextEditorProps) {
  const editorContent = content ?? value ?? ''

  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: {
          openOnClick: false,
          autolink: true,
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Matnni yozing...',
      }),
    ],
    []
  )

  const editor = useEditor(
    {
      extensions,
      content: editorContent,
      immediatelyRender: false,
      shouldRerenderOnTransaction: true,
      editorProps: {
        attributes: {
          class:
            'min-h-[200px] rounded-b-xl border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none prose prose-sm max-w-none',
        },
      },
      onUpdate: ({ editor: currentEditor }) => {
        onChange(currentEditor.getHTML())
      },
    },
    [extensions]
  )

  useEffect(() => {
    if (!editor || editor.isDestroyed) return
    if (editor.getHTML() !== editorContent) {
      editor.commands.setContent(editorContent || '<p></p>')
    }
  }, [editor, editorContent])

  if (!editor || editor.isDestroyed) return null

  const buttonClass = (active: boolean) =>
    [
      'rounded-md border px-2 py-1 text-xs transition-colors',
      active
        ? 'border-blue-300 bg-blue-100 text-blue-900 ring-1 ring-blue-200'
        : 'border-black/10 text-[#1d1d1f] hover:bg-gray-100',
    ].join(' ')

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-[#1d1d1f]">{label}</span>
      <div className="rounded-xl border border-black/10 bg-white">
        <div className="flex flex-wrap gap-1 border-b border-black/10 p-2">
          <button
            type="button"
            className={buttonClass(editor.isActive('bold'))}
            onMouseDown={(e) => {
              e.preventDefault()
              if (!editor || editor.isDestroyed) return
              editor.chain().focus().toggleBold().run()
            }}
          >
            Bold
          </button>
          <button
            type="button"
            className={buttonClass(editor.isActive('italic'))}
            onMouseDown={(e) => {
              e.preventDefault()
              if (!editor || editor.isDestroyed) return
              editor.chain().focus().toggleItalic().run()
            }}
          >
            Italic
          </button>
          <button
            type="button"
            className={buttonClass(editor.isActive('underline'))}
            onMouseDown={(e) => {
              e.preventDefault()
              if (!editor || editor.isDestroyed) return
              editor.chain().focus().toggleUnderline().run()
            }}
          >
            Underline
          </button>
          <button
            type="button"
            className={buttonClass(editor.isActive('heading', { level: 2 }))}
            onMouseDown={(e) => {
              e.preventDefault()
              if (!editor || editor.isDestroyed) return
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }}
          >
            H2
          </button>
          <button
            type="button"
            className={buttonClass(editor.isActive('heading', { level: 3 }))}
            onMouseDown={(e) => {
              e.preventDefault()
              if (!editor || editor.isDestroyed) return
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }}
          >
            H3
          </button>
          <button
            type="button"
            className={buttonClass(editor.isActive('bulletList'))}
            onMouseDown={(e) => {
              e.preventDefault()
              if (!editor || editor.isDestroyed) return
              editor.chain().focus().toggleBulletList().run()
            }}
          >
            Bullet
          </button>
          <button
            type="button"
            className={buttonClass(editor.isActive('orderedList'))}
            onMouseDown={(e) => {
              e.preventDefault()
              if (!editor || editor.isDestroyed) return
              editor.chain().focus().toggleOrderedList().run()
            }}
          >
            Numbered
          </button>
          <button
            type="button"
            className={buttonClass(editor.isActive('blockquote'))}
            onMouseDown={(e) => {
              e.preventDefault()
              if (!editor || editor.isDestroyed) return
              editor.chain().focus().toggleBlockquote().run()
            }}
          >
            Quote
          </button>
          <button
            type="button"
            className={buttonClass(editor.isActive({ textAlign: 'left' }))}
            onMouseDown={(e) => {
              e.preventDefault()
              if (!editor || editor.isDestroyed) return
              editor.chain().focus().setTextAlign('left').run()
            }}
          >
            Left
          </button>
          <button
            type="button"
            className={buttonClass(editor.isActive({ textAlign: 'center' }))}
            onMouseDown={(e) => {
              e.preventDefault()
              if (!editor || editor.isDestroyed) return
              editor.chain().focus().setTextAlign('center').run()
            }}
          >
            Center
          </button>
          <button
            type="button"
            className={buttonClass(editor.isActive({ textAlign: 'right' }))}
            onMouseDown={(e) => {
              e.preventDefault()
              if (!editor || editor.isDestroyed) return
              editor.chain().focus().setTextAlign('right').run()
            }}
          >
            Right
          </button>
          <button
            type="button"
            className={buttonClass(editor.isActive('link'))}
            onMouseDown={(e) => {
              e.preventDefault()
              if (!editor || editor.isDestroyed) return
              const previousUrl = editor.getAttributes('link').href as string | undefined
              const url = window.prompt('Link URL kiriting', previousUrl ?? 'https://')
              if (url === null) return
              if (!url.trim()) {
                editor.chain().focus().unsetLink().run()
                return
              }
              editor.chain().focus().setLink({ href: url.trim() }).run()
            }}
          >
            Link
          </button>
          <button
            type="button"
            className={buttonClass(false)}
            onMouseDown={(e) => {
              e.preventDefault()
              if (!editor || editor.isDestroyed) return
              editor.chain().focus().clearNodes().unsetAllMarks().run()
            }}
          >
            Clear
          </button>
        </div>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
