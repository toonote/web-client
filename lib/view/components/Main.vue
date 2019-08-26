<template>
<main class="main">
    <sidebar></sidebar>
    <editor></editor>
    <preview></preview>
</main>
</template>
<script type="ts">
import { createComponent } from '@vue/composition-api';

import Sidebar from './Sidebar.vue';
import Editor from './Editor.vue';
import Preview from './Preview.vue';

export default createComponent({
    components: {
        Sidebar,
        Editor,
        Preview,
    },
    setup(){
    }
});
</script>
