<template>
  <div class="editor" ref="editorElm"></div>
</template>

<script lang="ts">
import { watch, ref, onMounted } from 'vue';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';

import PasteImage from './extensions/PasteImage';
import { getExtensionByFile } from './utils/attachment';

export default {
  props: ['modelValue'],
  setup(props, ctx) {
    const editorElm = ref(null);
    let editor:Editor = null;

    onMounted(() => {
      editor = new Editor({
        element: editorElm.value,
        extensions: [
          StarterKit, Highlight, Typography, Placeholder, Image,
          PasteImage.configure({
            onPaste: (file: File) => {
              ctx.emit('insert-image', file);
              console.log('onPaste', file);
            },
          }),
        ],
        content: props.modelValue,
        onUpdate: ({ editor }) => {
          ctx.emit('update:modelValue', editor.getHTML());
        },
      });
    });

    watch(() => props.modelValue, (content: string) => {
      editor.commands.setContent(content);
    });

    return {
      editorElm,
    }
  }
}
</script>

<style lang="scss">
@import './styles/content.scss';
.editor {
  flex: 1;
}
.ProseMirror{
  height: 100%;
}
.ProseMirror-focused{
  outline: 0 none;
}
.ProseMirror{
  @include content;
}
.ProseMirror .is-editor-empty::before{
  content: attr(data-placeholder);
  float: left;
  color: #ced4da;
  pointer-events: none;
  height: 0;
}
</style>
