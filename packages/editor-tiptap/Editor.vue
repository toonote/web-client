<template>
  <div class="editor" ref="editorElm"></div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

export default {
  props: ['modelValue'],
  setup(props, ctx) {
    const editorElm = ref(null);

    onMounted(() => {
      new Editor({
        element: editorElm.value,
        extensions: [StarterKit],
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

<style>
.ProseMirror{
  height: 100%;
}
.ProseMirror-focused{
  outline: 0 none;
}
</style>
