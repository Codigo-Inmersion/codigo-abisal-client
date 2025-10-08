import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import "./RichTextEditor.css";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

// Componente para la barra de herramientas del editor
const MenuBar = ({ editor, onEmojiClick }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="editor-menu-bar">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        Lista
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        H4
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        Set horizontal rule
      </button>
      <button type="button" onClick={onEmojiClick}>
        😀
      </button>
    </div>
  );
};

const RichTextEditor = ({ value, onChange }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: value, // Contenido inicial
    onUpdate: ({ editor }) => {
      // Cuando el contenido cambia, llamamos a la función onChange
      onChange(editor.getHTML());
    },
  });
  const handleEmojiSelect = (emojiObject) => {
    if (editor) {
      // Insertamos el emoji directamente como texto
      editor.chain().focus().insertContent(emojiObject.emoji).run();
    }
    setShowEmojiPicker(false); // Cierra el picker
  };
  return (
    <div className="text-editor-container">
      <MenuBar
        editor={editor}
        onEmojiClick={() => setShowEmojiPicker(!showEmojiPicker)}
      />

      {showEmojiPicker && (
        <div className="emoji-picker-wrapper">
          {/* 3. Usamos el nuevo componente EmojiPicker */}
          <EmojiPicker
            onEmojiClick={handleEmojiSelect}
            theme="dark"
            pickerStyle={{ width: "100%" }}
          />
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
