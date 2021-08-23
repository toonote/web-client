<template>
  <div class="editor" ref="editorElm"></div>
</template>

<script lang="ts">
import { watch, ref, onMounted } from 'vue';
import { Editor } from '@tiptap/core';

import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import Bulletlist from '@tiptap/extension-bullet-list';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';

import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';

// import Image from '@tiptap/extension-image';
import Image from './extensions/Image';
import PasteImage from './extensions/PasteImage';

export default {
  props: ['modelValue'],
  setup(props, ctx) {
    const editorElm = ref(null);
    let editor:{
      tiptap: Editor;
    } = {
      tiptap: null,
    };

    onMounted(() => {
      editor.tiptap = new Editor({
        element: editorElm.value,
        extensions: [
          Blockquote, Bold, Bulletlist,
          Code, CodeBlock,
          Document, Dropcursor,
          Gapcursor,
          HardBreak, Heading, History, HorizontalRule, Highlight,
          Italic,
          Image.configure({
            inline: true,
          }),
          ListItem,
          OrderedList,
          Paragraph, Placeholder,
          PasteImage.configure({
            onPaste: (file: File) => {
              ctx.emit('insert-image', file);
              console.log('onPaste', file);
            },
          }),
          Strike,
          Text,
          Typography,
        ],
        content: props.modelValue,
        onUpdate: ({ editor }) => {
          ctx.emit('update:modelValue', editor.getHTML());
        },
      });
    });

    watch(() => props.modelValue, (content: string) => {
      editor.tiptap.commands.setContent(content);
    });

    return {
      editor,
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
