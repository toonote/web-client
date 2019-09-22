import { WebClientView } from '../view/main';
import WebClientModel, { Notebook } from '../model/main';

interface User {
    isLogin: boolean,
    name?: string,
    avatarUrl?: string,
    labels?: string[],
};

interface State {
    noteState: 'LOADING' | 'OPEN',
    currentNoteId: string,
    editorContent: string,
};

export default class WebClientController{
    private _view:WebClientView;
    private _model:WebClientModel;
    private _user:User;
    private _notebook: Notebook;
    private _state: State;
    constructor(view:WebClientView, model:WebClientModel){
        this._view = view;
        this._model = model;
        this._user = {
            isLogin: false,
        };
        this._notebook = {
            title: 'loading',
            categories: {}
        };
        this._state = {
            noteState: 'LOADING',
            currentNoteId: '',
            editorContent: '',
        };
        this._initModel();
        this._initViewListener();
    }
    public mount(container: HTMLElement | string){
        this._view.app.$mount(container);
    }

    private _initViewListener() {
        const app = this._view.app;

        // 用户登录
        app.$on('user.login', (data: any) => {
            this._user = {
                isLogin: true,
                name: data.userInfo.name,
                avatarUrl: data.userInfo.avatarUrl,
                labels: [],
            };
            this._view.setData('userInfo', this._user);

            const token = localStorage.getItem('TOONOTE-TOKEN');
            if(token){
                this._model.setToken(token);
                this._refreshData();
            }
        });

        // 切换笔记
        app.$on('note.switchActive', async (data: any) => {
            this._state.noteState = 'LOADING';
            this._view.setData('editor', {
                content: ''
            });
            const note = (await this._model.Note.find(data.id)).data.data;
            this._view.setData('editor', {
                content: note.content
            });
            this._state.currentNoteId = note.id;
        });

        // 笔记内容发生变化
        app.$on('editor.change', async (data: any) => {
            console.log('editor.change', this._state.currentNoteId, data.content, this._state.noteState);
            if(this._state.noteState === 'LOADING'){
                if(this._state.currentNoteId && data.content){
                    this._state.noteState = 'OPEN';
                }
                return;
            }
            // if(!data.content) return;
            await this._model.Note.update(this._state.currentNoteId, {
                content: data.content
            });
        });
    }

    private _initModel(){
        this._fillEmptyData();
    }

    
    private _fillEmptyData(){
        this._view.setData('state', this._state);
        this._view.setData('editor', {
            content: this._state.editorContent,
        });
        this._view.setData('userInfo', this._user);
        this._view.setData('notebook', this._notebook);
    }

    private async _refreshData(notebookId?: string){
        let notebook:any;
        if(notebookId){
            notebook = (await this._model.Notebook.find(notebookId)).data.data;
        }else{
            const notebookList = (await this._model.Notebook.all()).data.data;
            notebook = notebookList[0];
        }

        let categories = (await this._model.Category.all()).data.data;
        categories = categories.filter((category:any) => {
            return category.notebookId === notebook!.id;
        });

        let notes = (await this._model.Note.all()).data.data;
        notes = notes.filter((note:any) => {
            return note.notebookId === notebook!.id;
        });

        const categoryObject:any = {};
        categories.forEach((category:any) => {
            const noteList = notes.filter((note: any) => {
                return note.categoryId === category.id;
            }).map((note: any) => {
                return {
                    id: note.id,
                    title: note.title,
                }
            });
            categoryObject[category.title] = noteList;
        });

        // 组装成树形
        const notebookData:Notebook = {
            title: notebook.title,
            categories: categoryObject,
        };
        // 填充view
        this._view.setData('notebook', notebookData);
    }

}
