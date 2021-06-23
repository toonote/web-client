// import 'v-contextmenu/dist/index.css';

import { createApp, h, reactive } from 'vue';
import Main from './components/Main.vue';
// import ContentMenu from 'v-contextmenu';

// Vue.use(ContentMenu);

export function createVueApp(){
  return createApp({
    setup(){
      return reactive({});
    },
    render(){
      return h(Main);
    }
  });
}
