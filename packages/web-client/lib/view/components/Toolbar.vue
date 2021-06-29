<template>
  <div class="toolbar">
    <div class="btn active">
      <i class="">笔记本</i>
    </div>
    <div class="btn">
      <i class="">新建笔记</i>
    </div>
    <div class="btn">
      <i class="">上传</i>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
@import '../styles/ui.scss';

$buttonSize: 48px;

.toolbar{
  display: flex;
}

.btn{
  @include button;
  width: $buttonSize;
  height: $buttonSize;
  margin-right: 20px;
  &.active, &:hover{
    @include buttonShadow;
  }
}

</style>
