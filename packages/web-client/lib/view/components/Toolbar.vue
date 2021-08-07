<template>
  <div class="toolbar">
    <div class="btn-wrapper btn active">
      <svg-icon icon="toolbar/notebook" />
    </div>
    <popup class="btn-wrapper" :trigger="click">
      <template v-slot>
        <div class="btn">
          <svg-icon icon="toolbar/new" />
        </div>
      </template>
      <template v-slot:popupContent>
        <menu-item>
          <svg-icon className="icon" icon="notebook/note" />
          <span>笔记</span>
        </menu-item>
      </template>
    </popup>
  </div>
</template>

<script>

import Popup from './ui/Popup.vue';
import MenuItem from './ui/MenuItem.vue';

export default {
  components: {
    Popup,
    MenuItem,
  }
}
</script>

<style scoped lang="scss">
@import '../styles/ui.scss';
@import '../styles/variables.scss';

.toolbar{
  display: flex;
}

.btn{
  @include button;
  width: $buttonSize;
  height: $buttonSize;
  font-size: 18px;
  line-height: $buttonSize;
  &.active, &:hover{
    @include buttonShadow;
  }
}
</style>
<style lang="scss">
.btn-wrapper{
  margin-right: 20px;
}
</style>
