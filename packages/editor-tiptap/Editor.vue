<template>
  <div class="editor" ref="editorElm"></div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';

export default {
  props: ['modelValue'],
  setup(props, ctx) {
    const editorElm = ref(null);

    onMounted(() => {
      new Editor({
        element: editorElm.value,
        extensions: [StarterKit, Highlight, Typography, Placeholder],
        content: props.modelValue,
        onUpdate: ({ editor }) => {
          ctx.emit('update:modelValue', editor.getHTML());
        },
      });
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
