import { WebClientView } from './view/WebClientView';
import { ViewDataEditor } from './view/interfaces/ViewData';
import { WebClientStore } from './store/WebClientStore';
import { get as getSysConfig } from './sysConfig';
import { eventHub, EVENTS } from './utils/eventHub';
import { NoteCreate } from '@toonote/shared/interfaces/Store';
export interface WebClientOptions {
  container: string|HTMLElement;
  store?: string;
}

export class WebClient {
  private container:HTMLElement;
  private view:WebClientView;
  private store:WebClientStore;
  static async getInstance(options: WebClientOptions): Promise<WebClient>{
    const webClient = new WebClient(options);
    await webClient._init(options);
    return webClient;
  }
  constructor(options: WebClientOptions){
    if(typeof options.container === 'string'){
        this.container = document.querySelector(options.container);
    }else{
        this.container = options.container;
    }

    this.view = new WebClientView();
    this.view.mount(this.container);
  }
  private async _init(options: WebClientOptions){

    let store = options.store;

    if(!store){
      store = getSysConfig('STORE_PLUGIN');
    }
    if(!store){
      store = '@toonote/store-local';
    }


    this.store = await WebClientStore.getInstance({ store });

    this.readData();

    this.initEvent();
    // if (import.meta.env.DEV){
      // this._test();
    // }
  }
  async readData(){
    await this.readNotebook();
    await this.readNote();
  }
  async readNotebook(){
    const notebookList = await this.store.getNotebookList();
    if (!notebookList || !notebookList.length ) {
      await this.initData();
      return this.readNotebook();
    }
    const notebookData = await this.store.getNotebook(notebookList[0].id);
    this.view.data.notebook = notebookData;
  }
  async readNote(){
    // todo: 上次状态恢复
    const noteSummary = this.view.data.notebook.categories[0].notes[0];
    const note = await this.store.getNote(noteSummary.id);
    this.view.data.editor[0] = {
      ...note,
    };
  }
  async initData(){
    const notebook = await this.store.createNotebook({
      title: '我的笔记',
    });
    const category = await this.store.createCategory({
      title: '默认分类',
      notebookId: notebook.id,
    });
    const note = await this.store.createNote({
      title: '我的笔记',
      content: '',
      categoryId: category.id,
    });
  }
  async initEvent(){

    // carete note
    eventHub.on(EVENTS.CREATE_NOTE, async (data: NoteCreate) => {
      const newNote = await this.store.createNote(data);
      this.view.data.editor[0] = {
        ...newNote,
      }
      this.readNotebook();
    });

    // update note
    eventHub.on(EVENTS.UPDATE_NOTE, async (data: ViewDataEditor) => {
      await this.store.updateNote(data.id, {
        title: data.title,
        content: data.content,
      });
    });

    // update note title
    eventHub.on(EVENTS.UPDATE_NOTE_TITLE, async (title: string) => {
      this.readNotebook();
    });

    eventHub.on(EVENTS.SWITCH_CURRENT_NOTE, async (id: string) => {
      const note = await this.store.getNote(id);
      this.view.data.editor[0] = {
        ...note,
      };
    });

  }
  _test(){
    this.view.data.user = {
      name: 'TooBug',
      avatarUrl: 'https://avatars3.githubusercontent.com/u/1243593?s=100&v=4',
    };
    /* this.view.data.editor[0] = {
      content: 'test',
    }; */
    /* this.view.data.notebook = {
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
    }; */
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
