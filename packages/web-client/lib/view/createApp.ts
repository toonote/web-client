// import 'v-contextmenu/dist/index.css';

import { createApp, h, reactive } from 'vue';
import Main from './components/Main.vue';
import 'vite-plugin-svg-icons/register';
import SvgIcon from './components/SvgIcon.vue';
// import ContentMenu from 'v-contextmenu';

// Vue.use(ContentMenu);

export function createVueApp(){
  const app = createApp({
    setup(){
      return reactive({});
    },
    render(){
      return h(Main);
    }
  });

  app.component('SvgIcon', SvgIcon);

  return app;
}
