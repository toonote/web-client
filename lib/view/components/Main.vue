<template>
<main class="main">
    <transition name="slide">
        <sidebar class="sidebar"></sidebar>
    </transition>
    <transition name="slide-flex">
        <editor class="editor" v-model="data.data.content"></editor>
    </transition>
    <transition name="slide-flex">
        <preview class="preview" :content="data.data.content"></preview>
    </transition>
</main>
</template>

<script type="ts">
import { createComponent, reactive } from '@vue/composition-api';

import { getData } from '../dataInjector';

import Sidebar from './Sidebar.vue';
import Editor from '@toonote/md-editor';
import Preview from './Preview.vue';

export default createComponent({
    components: {
        Sidebar,
        Editor,
        Preview,
    },
    setup(){
        const data = reactive(getData('editor'));
        return {
            data
        };
    }
});
</script>

<style>
*{
	padding:0;
	margin:0;
}
html,body,#wrapper{
	height: 100%;
}
body{
	font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}

/*动画*/
.slide-enter-active, .slide-leave-active {
	transition: width .5s;
}
.slide-enter, .slide-leave-active {
	width: 0!important;
}
.slide-flex-enter-active, .slide-flex-leave-active {
	transition: flex .5s;
}
.slide-flex-enter, .slide-flex-leave-active {
	flex: 0!important;
}

.main{
	display: flex;
	height:100%;
	/* background:url('../images/bg.jpg') center 40% no-repeat; */
}
.main.withSidebar{
	/* background-position: 60% 40%; */
}
/* .main.withMenubar{
	height:calc(100% - 24px);
} */
.main .sidebar{
    width: 250px;
}
.main .editor,
.main .preview{
    flex: 1;
}


/* 全局图标定义 */
.icon::before{
	content:' ';
	display: inline-block;
	width:16px;
	height:16px;
	vertical-align: sub;
	background-size:16px 16px;
	background-repeat:no-repeat;
}
</style>
