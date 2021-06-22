<template>
<aside>
    <user-info></user-info>
    <note-tree></note-tree>
</aside>
</template>
<script type="ts">
import { createComponent } from '@vue/composition-api';

import UserInfo from './UserInfo.vue';
import NoteTree from './NoteTree.vue';

export default createComponent({
    components: {
        UserInfo,
        NoteTree,
    }
});
</script>
<style scoped>
.sidebar{
	-webkit-user-select: none;
	user-select:none;
	background:#F6F6F6;
	border-right:1px solid #E0E0E0;
	color:#585858;
	/*font-family: "PingFang SC";*/
	min-height:100%;
	overflow-y: auto;
}
</style>
