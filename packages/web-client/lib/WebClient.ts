import { Store } from '../interfaces/Store';
import { StoreLocal } from '@toonote/store-local';
import { WebClientView } from './view/WebClientView';
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

    if (import.meta.env.DEV){
      this._test();
    }
  }
  _test(){
    this.view.data.user = {
      name: 'TooBug',
      avatarUrl: 'https://avatars3.githubusercontent.com/u/1243593?s=100&v=4',
    };
    this.view.data.editor[0] = {
      content: 'test',
    };
    this.view.data.notebook = {
      id: 'test',
      title: '笔记本',
      categories: [
        {
          id: 'c1',
          title: '分类1',
          notes: [{
            id: 'n1',
            title: '标题1',
          }, {
            id: 'n2',
            title: '标题2',
          }],
        },
        {
          id: 'c2',
          title: '分类2',
          notes: [{
            id: 'n3',
            title: '标题3',
          }, {
            id: 'n4',
            title: '标题4',
          }],
        }
      ],
    };
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
