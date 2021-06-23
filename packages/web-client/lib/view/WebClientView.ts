import { createVueApp } from './createApp';
import { data } from './viewData';
/* import createApp from './createApp';
import { setData } from './dataInjector';

const { app } = createApp();

const webClientView:WebClientView = {
    app,
    setData,
};
 */
interface WebClientViewOptions {
    // todo
}

export class WebClientView{
    public vue;
    public data = data;
    constructor(options?: WebClientViewOptions){
        this.vue = createVueApp();
    }
    mount(container: HTMLElement): void{
        this.vue.mount(container);
    }
}
