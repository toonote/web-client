import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import Main from './components/Main.vue';

Vue.use(VueCompositionApi);


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
