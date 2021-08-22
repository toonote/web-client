import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';

export interface PasteImageOptions {
  onPaste: (file: File) => void;
}

export const PasteImage = Extension.create<PasteImageOptions>({
  name: 'pasteImage',

  defaultOptions: {
     onPaste: () => {},
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('pasteImage'),
        props: {
          handlePaste: (view, event, slice) => {
            const file = event.clipboardData.files && event.clipboardData.files[0];
            if (!file) return false;
            if (this.options.onPaste && typeof this.options.onPaste === 'function') {
              this.options.onPaste(file);
            }
            // Bus.$emit('pasteImage', file);
            return true;
          }
        },
      }),
    ];
  },

});

export default PasteImage;
