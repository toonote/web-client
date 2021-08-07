<template>
  <div class="ui-popup-ref" :class="$attrs.class" ref="subject">
    <slot></slot>
  </div>
  <teleport to="body">
    <div class="ui-popup" ref="popup">
      <slot name="popupContent"></slot>
    </div>
  </teleport>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  props: {
    trigger: {
      type: String,
      default: 'click',
    }
  },
  setup(props){
    const subject = ref(null);
    const popup = ref(null);

    let enterListener: EventListener, leaveListener:EventListener;

    onMounted(() => {
      enterListener = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const popupWidth = popup.value.offsetWidth;

        const target = subject.value;
        const x = target.offsetLeft + target.offsetWidth / 2 - popupWidth / 2;
        const y = target.offsetTop + target.offsetHeight;

        console.log(target.offsetLeft, target.offsetWidth, popupWidth);

        popup.value.style.left = x + 'px';
        popup.value.style.top = y + 'px';
        popup.value.classList.add('ui-popup-show');
        // console.log('mouseenter', e);
      };
      leaveListener = (e) => {
        popup.value.classList.remove('ui-popup-show');
      };
      subject.value.addEventListener(props.trigger, enterListener);
      document.body.addEventListener('click', leaveListener);
    });

    onBeforeUnmount(() => {
      subject.value.removeEventListener(props.trigger, enterListener);
      document.body.removeEventListener('click', leaveListener);
    });


    return {
      subject,
      popup,
    };
  }
}
</script>

<style scoped lang="scss">
@import '../../styles/ui.scss';

.ui-popup{
  left: 0;
  top: 0;
  visibility: hidden;
  @include popup;
  @include popupStart;
  @include popupShadow;
}
.ui-popup.ui-popup-show{
  visibility: visible;
  @include popupEnd;
}
</style>
