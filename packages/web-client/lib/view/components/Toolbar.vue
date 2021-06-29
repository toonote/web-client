<template>
  <div class="toolbar">
    <div class="btn active">
      <svg-icon icon="toolbar/notebook" />
    </div>
    <div class="btn">
      <svg-icon icon="toolbar/new" />
    </div>
    <!--  -->
  </div>
</template>

<script>
export default {

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
  margin-right: 20px;
  &.active, &:hover{
    @include buttonShadow;
  }
}

</style>
