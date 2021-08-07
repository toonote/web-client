<template>
  <div class="ui-pop-menu-ref" :class="$attrs.class" ref="subject">
    <slot></slot>
  </div>
  <teleport to="body">
    <div class="ui-pop-menu" ref="popMenu">
      <slot name="pop-menuContent"></slot>
    </div>
  </teleport>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  setup(){
    const subject = ref(null);
    const popMenu = ref(null);

    let enterListener, leaveListener;

    onMounted(() => {
      enterListener = (e) => {
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
      subject.value.addEventListener('mouseenter', enterListener);
      subject.value.addEventListener('mouseleave', leaveListener);
    });

    onBeforeUnmount(() => {
      subject.value.removeEventListener('mouseenter', enterListener);
      subject.value.removeEventListener('mouseleave', leaveListener);
    });


    return {
      subject,
      popMenu,
    };
  }
}
</script>

<style scoped lang="scss">
@import '../../styles/ui.scss';

.ui-popup{
  @include popup;
  @include popupStart;
  @include popupShadow;
}
.ui-popup.ui-popup-show{
  @include popupEnd;
}
</style>
