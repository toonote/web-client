<template>
<section class="login">
    <div class="wrapper">
        <div class="header">
            <p class="description">微信扫描小程序码登录</p>
        </div>
        <div class="qrCode">
            <img id="loginQrCode" />
        </div>
        <div class="footer">
            <p>
                <a href="https://api.xiaotu.io/oauth/redirect/github?client=mac">使用Github登录</a>
                <a href="https://github.com/TooNote/TooNote/issues/new" class="externalLink">无法登录？</a>
            </p>
        </div>
    </div>
</section>
</template>
<script lang="ts">
import { createComponent, computed } from '@vue/composition-api';

export default createComponent({
    setup(props: any, context: any){

		/* const axios = require('axios');
		const BASE_URL = DEBUG ?
			'https://test-api.xiaotu.io':
			'https://api.xiaotu.io';

		// step 1，获取场景值
		let response = await axios.get(`${BASE_URL}/user/getLoginScene?_=${Date.now()}`);
		if(+response.status !== 200){
			alert('服务器错误，暂时无法登录，请稍后再试');
			return;
		}
		let scene = response.data.scene;

		// step 2，显示二维码
		document.querySelector('#loginQrCode').src = `${BASE_URL}/user/weappLogin?scene=${scene}`;

		// step3，定时刷新
		let getResult = async function(){
			let response = await axios.get(`${BASE_URL}/user/getLoginStatus?scene=${scene}&_=${Date.now()}`);
			if(+response.status !== 200){
				alert('服务器错误，暂时无法登录，请稍后再试');
				return;
			}
			if(response.data.isLogin){
				console.log('登录成功！');
				location.href = `${BASE_URL}/oauth/weappToken?scene=${scene}&client=mac`;
			}else{
				setTimeout(getResult, 2000);
			}
		};

		getResult();

		console.log(response); */
	

        return {
        };
    }
});

</script>
<style scoped>
.login{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: white;
    z-index: 1000;
}
.login a:link{
	color: #999;
	text-decoration: none;
}
.login a:hover{
	color: #333;
}

.wrapper{
    width: 360px;
    margin:0 auto;
}
/*登录页面头部开始*/
.header{
	height:284px;
	background:url(../images/login-header.png) no-repeat;
	background-size:contain;
}
.header .description{
	padding-top: 280px;
    text-align: center;
    color: #333;
    font-size: 18px;
}
/*登录页面头部结束*/
/*登录页面小程序码开始*/
.qrCode{
	margin-top:30px;
	height:200px;
	text-align:center;
}
.qrCode img{
	max-height:100%;
}
/*登录页面小程序码结束*/
/*登录页面底部开始*/
.footer{
	/* position: absolute; */
	/* bottom:20px; */
	/* width:100%; */
	text-align: center;
	font-size:14px;
}
/*登录页面询问结束*/

</style>
