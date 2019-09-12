import 'v-contextmenu/dist/index.css';

import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import Main from './components/Main.vue';
import ContentMenu from 'v-contextmenu';

Vue.use(VueCompositionApi);
Vue.use(ContentMenu);


function createApp(){
    return new Vue({
        render(h){
            return h(Main);
        }
    });
}

export default function(){
    return {
        app: createApp(),
    }
}
