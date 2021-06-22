// import 'v-contextmenu/dist/index.css';

import { createApp, h } from 'vue';
import Main from './components/Main.vue';
// import ContentMenu from 'v-contextmenu';

// Vue.use(ContentMenu);

export function createVueApp(){
    return createApp({
        /* beforeCreate(){
            // @ts-ignore
            this.$root.$webClient = this;
        }, */
        render(){
            return h(Main);
        }
    });
}
