<template>
  <section class="userInfo">
    <img v-if="user && user.avatarUrl" class="avatar" :src="user.avatarUrl" />
	  <img v-else class="avatar" src="../images/avatar.png" />
    <!-- <div class="userName">
      <span v-if="user && user.name">{{user.name}}</span>
      <a v-else @click="doLogin" href="#">点击登录</a>
    </div> -->
    <!-- <div class="labelWrapper">
      <div v-for="label in user.labels" :key="label" class="label">{{label}}</div>
    </div> -->
  </section>
</template>
<script>
import { getData } from '../viewData';
export default {
  setup(props, ctx){
    const user = getData('user');
    return {
      user,
    };
      /*
      const doLogin = function(){
    ctx.root.$webClient.$emit('user.login', {});
      };

      return {
          data: userInfo,
          doLogin,
      }; */
  }
};
</script>
<style scoped lang="scss">
@import '../styles/ui.scss';
@import '../styles/variables.scss';

.userInfo{
	margin:0 auto;
}
.userInfo .avatar{
	width: $toolbarButtonSize;
	height: $toolbarButtonSize;
	border-radius: 10px;
	float: left;
}
/* .userInfo .userName{
	margin-left:50px;
	height:40px;
	line-height: 40px;
	font-size:14px;
}
.userInfo .userName a{
	color: #585858;
	text-decoration: none;
}
.userInfo .labelWrapper{
	position: absolute;
	top:10px;
	right:10px;
}
.userInfo .labelWrapper .label{
	font-size:12px;
	padding:2px 4px;
	border-radius:2px;
    background: #718c00;
    display: inline-block;
    color: white;
} */
</style>
