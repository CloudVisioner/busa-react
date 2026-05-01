'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';
import type { MouseEvent } from 'react';

interface RichTextEditorProps {
  value?: string;
  content?: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function RichTextEditor({
  value,
  content,
  onChange,
  label = 'Description',
}: RichTextEditorProps) {
  const editorContent = content ?? value ?? '';
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: "Tadbir tavsifini yozing...",
      }),
    ],
    content: editorContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'min-h-[200px] rounded-b-xl border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none prose prose-sm max-w-none',
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== editorContent) {
      editor.commands.setContent(editorContent || '<p></p>');
    }
  }, [editor, editorContent]);

  if (!editor) return null;

  const buttonClass = (active = false) =>
    `rounded-md border px-2 py-1 text-xs ${active ? 'border-[#00236f] bg-[#00236f] text-white' : 'border-black/10 text-[#1d1d1f] hover:bg-[#f5f5f7]'}`;
  const keepSelection = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-[#1d1d1f]">
        {label}
      </span>
      <div className="rounded-xl border border-black/10 bg-white">
        <div className="flex flex-wrap gap-1 border-b border-black/10 p-2">
          <button type="button" className={buttonClass(editor.isActive('bold'))} onMouseDown={keepSelection} onClick={() => editor.chain().focus().toggleBold().run()}>
            Bold
          </button>
          <button type="button" className={buttonClass(editor.isActive('italic'))} onMouseDown={keepSelection} onClick={() => editor.chain().focus().toggleItalic().run()}>
            Italic
          </button>
          <button type="button" className={buttonClass(editor.isActive('underline'))} onMouseDown={keepSelection} onClick={() => editor.chain().focus().toggleUnderline().run()}>
            Underline
          </button>
          <button type="button" className={buttonClass(editor.isActive('heading', { level: 2 }))} onMouseDown={keepSelection} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            H2
          </button>
          <button type="button" className={buttonClass(editor.isActive('heading', { level: 3 }))} onMouseDown={keepSelection} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
            H3
          </button>
          <button type="button" className={buttonClass(editor.isActive('bulletList'))} onMouseDown={keepSelection} onClick={() => editor.chain().focus().toggleBulletList().run()}>
            Bullet
          </button>
          <button type="button" className={buttonClass(editor.isActive('orderedList'))} onMouseDown={keepSelection} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            Numbered
          </button>
          <button type="button" className={buttonClass(editor.isActive('blockquote'))} onMouseDown={keepSelection} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
            Quote
          </button>
          <button
            type="button"
            className={buttonClass(editor.isActive({ textAlign: 'left' }))}
            onMouseDown={keepSelection}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
          >
            Left
          </button>
          <button
            type="button"
            className={buttonClass(editor.isActive({ textAlign: 'center' }))}
            onMouseDown={keepSelection}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
          >
            Center
          </button>
          <button
            type="button"
            className={buttonClass(editor.isActive({ textAlign: 'right' }))}
            onMouseDown={keepSelection}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
          >
            Right
          </button>
          <button
            type="button"
            className={buttonClass(editor.isActive('link'))}
            onMouseDown={keepSelection}
            onClick={() => {
              const previousUrl = editor.getAttributes('link').href as string | undefined;
              const url = window.prompt('Link URL kiriting', previousUrl ?? 'https://');
              if (url === null) return;
              if (!url.trim()) {
                editor.chain().focus().unsetLink().run();
                return;
              }
              editor.chain().focus().setLink({ href: url.trim() }).run();
            }}
          >
            Link
          </button>
          <button type="button" className={buttonClass(false)} onMouseDown={keepSelection} onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
            Clear
          </button>
        </div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
