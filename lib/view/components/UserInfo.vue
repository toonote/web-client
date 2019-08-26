<template>
<section class="userInfo">
    hello userInfo {{data.data.userName}}
</section>
</template>
<script lang="ts">
import { getData } from '../dataInjector';
import { createComponent } from '@vue/composition-api';
export default createComponent({
    setup(){
        const userInfo = getData('userInfo');
        return {
            data: userInfo
        };
    }
});
</script>
