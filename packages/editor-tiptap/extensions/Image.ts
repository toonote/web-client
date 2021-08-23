import Image from '@tiptap/extension-image';

const CustomImage = Image.extend({
  addAttributes() {
    return {
      attachment_id: {
        default: null,
      },
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
    };
  },
});

export default CustomImage;
