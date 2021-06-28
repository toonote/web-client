<template>
  <section class="preview">
    <div
      class="markdown"
      @click="handleContent"
      v-html="html"
    />
  </section>
</template>
<script lang="ts">
import { computed } from 'vue';
// import renderer from '../utils/renderer';

export default {
    props: ['content'],
    setup(props, context){
        const html = computed(() => {
          return '';
            // return renderer.render(props.content);
        });

        const handleContent = (e:Event) => {
			let $target = e.target as HTMLLinkElement;
			// 链接
			if($target.tagName === 'A' && /^https?:\/\//.test($target.href)){
				// let shell = require('electron').shell;
                // shell.openExternal($target.href);
                // todo:兼容
                window.open($target.href);
				e.preventDefault();
			}
		}

        return {
            html,
            handleContent,
        };
    }
};
</script>
<style scoped>
/* @import "../styles/markdown.css"; */

.preview{
	font-family: "PingFang SC";
	height:100%;
	overflow-y:auto;
	flex:1;
	font-size:14px;
	line-height: 28px;
	background:#fff;
}
</style>
