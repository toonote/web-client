<template>
  <transition name="height" @enter="enter" @after-enter="afterEnter" @leave="leave">
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">
const enter = (dom: HTMLElement) => {

  const width = getComputedStyle(dom).width;
  dom.style.width = width;
  dom.style.height = 'auto';
  dom.style.position = 'absolute';

  const height = getComputedStyle(dom).height;

  console.log('enter', dom, height);

  dom.style.width = null;
  dom.style.position = null;
  dom.style.visibility = null;
  dom.style.height = '0px';

  // Force repaint to make sure the
  // animation is triggered correctly.
  getComputedStyle(dom).height;
  // dom.style.height = '0px';

  requestAnimationFrame(() => {
    dom.style.height = height;
  });
};

const afterEnter = (dom: HTMLElement) => {
  dom.style.height = 'auto';
};

const leave = (dom: HTMLElement) => {
    const height = getComputedStyle(dom).height;

    dom.style.height = height;

    // Force repaint to make sure the
    // animation is triggered correctly.
    getComputedStyle(dom).height;

    requestAnimationFrame(() => {
      dom.style.height = '0px';
    });
};
</script>

<style scoped lang="scss">
* {
  will-change: height;
}
// transition
.height-enter-active,
.height-leave-active{
  transition: height .2s ease-in-out;
  overflow: hidden;
}

.height-enter-from,
.height-leave-to{
  height: 0;
}

</style>
