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
