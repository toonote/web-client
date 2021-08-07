<template>
  <div class="ui-menu-item">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  props: {

  }
}
</script>

<style lang="scss">
@import '../../styles/ui.scss';
.ui-menu-item {
  @include menuItem;
}
</style>
