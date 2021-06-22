<template>
  <section class="userInfo">
    <!-- <img v-if="data.data.avatarUrl" class="avatar" :src="data.data.avatarUrl" />
	<img v-else class="avatar" src="../images/avatar.png" />
	<div class="userName">
		<span v-if="data.data.name">{{data.data.name}}</span>
		<a v-else @click="doLogin" href="#">点击登录</a>
	</div>
	<div class="labelWrapper">
		<div v-for="label in data.data.labels" :key="label" class="label">{{label}}</div>
	</div> -->
  </section>
</template>
<script>
import { getData } from '../dataInjector';
export default {
    setup(props, ctx){
        /* const userInfo = getData('userInfo');

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
<style scoped>
.userInfo{
	padding:10px;
	margin:0 auto;
    border-bottom: 1px solid #e0e0e0;
    position: relative;
}
.userInfo .avatar{
	width:40px;
	height:40px;
	border-radius: 40px;
	float:left;
}
.userInfo .userName{
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
}
</style>
