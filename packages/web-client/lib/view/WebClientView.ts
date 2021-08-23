import { createVueApp } from './createApp';
import { data } from './viewData';

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
