'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
// import Image from '@tiptap/extension-image'; // Replaced by Figure
import Figure from '@/components/admin/extensions/Figure';
import { Bold, Italic, Heading1, Heading2, Quote, List, Image as ImageIcon, Minus, Loader2 } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { api, toBase64 } from '@/lib/api';
import { toast } from 'sonner';

interface MediumEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function MediumEditor({ content, onChange }: MediumEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Tell your story...',
      }),
      Figure,
    ],
    immediatelyRender: false,
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[300px]',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const handleImageClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;

    setUploading(true);
    try {
        // Backend API doesn't support standalone upload endpoint yet.
        // We will simple convert to Base64 and embed it as data URL.
        const base64 = await toBase64(file);
        editor.chain().focus().setFigure({ src: base64, caption: '' }).run();
    } catch (error) {
        console.error(error);
        toast.error('Image processing failed');
    } finally {
        setUploading(false);
        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="relative">
      <input 
        type="file" 
        hidden 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*"
      />

      {/* Bubble Menu - Formatting for selected text */}
      {editor && (
        <BubbleMenu 
          editor={editor} 
          className="flex items-center gap-1 p-1 bg-gray-900 text-white rounded-lg shadow-xl overflow-hidden"
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 hover:bg-gray-700 transition-colors ${editor.isActive('bold') ? 'text-primary-light' : ''}`}
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 hover:bg-gray-700 transition-colors ${editor.isActive('italic') ? 'text-primary-light' : ''}`}
          >
            <Italic size={16} />
          </button>
          <div className="w-px h-4 bg-gray-700 mx-1" />
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 hover:bg-gray-700 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'text-primary-light' : ''}`}
          >
            <Heading1 size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-2 hover:bg-gray-700 transition-colors ${editor.isActive('heading', { level: 3 }) ? 'text-primary-light' : ''}`}
          >
            <Heading2 size={16} />
          </button>
          <div className="w-px h-4 bg-gray-700 mx-1" />
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 hover:bg-gray-700 transition-colors ${editor.isActive('blockquote') ? 'text-primary-light' : ''}`}
          >
            <Quote size={16} />
          </button>
        </BubbleMenu>
      )}

      {/* Floating Menu - Quick add options on new lines */}
      {editor && (
        <FloatingMenu 
          editor={editor} 
          className="flex items-center gap-1"
        >
          <div className="flex items-center gap-1 p-1 bg-white border border-gray-200 rounded-lg shadow-lg">
             <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className="p-2 hover:bg-gray-100 rounded-md text-gray-600 transition-colors"
              title="Heading"
            >
              <Heading1 size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className="p-2 hover:bg-gray-100 rounded-md text-gray-600 transition-colors"
              title="Bullet List"
            >
              <List size={18} />
            </button>
             <button
              onClick={handleImageClick}
              className="p-2 hover:bg-gray-100 rounded-md text-gray-600 transition-colors relative"
              title="Image"
              disabled={uploading}
            >
              {uploading ? <Loader2 size={18} className="animate-spin text-primary" /> : <ImageIcon size={18} />}
            </button>
             <button
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className="p-2 hover:bg-gray-100 rounded-md text-gray-600 transition-colors"
              title="Divider"
            >
              <Minus size={18} />
            </button>
          </div>
        </FloatingMenu>
      )}

      {/* Main Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
