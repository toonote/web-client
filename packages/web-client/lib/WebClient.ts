import { Store } from '../interfaces/Store';
import { StoreLocal } from '@toonote/store-local';
import { WebClientView } from './view/main';
interface IStore{
    new(options): Store
}

export interface WebClientOptions {
    container: string|HTMLElement,
    storage?: IStore|string,
}

export class WebClient {
    private container:HTMLElement
    private storageClass: IStore
    private view:WebClientView
    constructor(options: WebClientOptions){
        if(typeof options.container === 'string'){
            this.container = document.querySelector(options.container);
        }else{
            this.container = options.container;
        }

        if(options.storage){
            if(typeof options.storage === 'string'){
                this.storageClass = require(options.storage);
            }else{
                this.storageClass = options.storage;
            }
        }else{
            this.storageClass = StoreLocal;
        }

        this.view = new WebClientView();
        this.view.mount(this.container);
    }
}


/* import WebClientController from '../controller/main';
import WebClientModel from '../model/main';

const BASE_URL = process.env.NODE_ENV === 'production' ?
            'https://api.xiaotu.io':
            'https://test-api.xiaotu.io';
const model = new WebClientModel({
    localStorage: 'ls',
    endpoint: BASE_URL + '/api/v2/',
    headers: {}
})

const controller = new WebClientController(view, model);
controller.mount('#container'); */
