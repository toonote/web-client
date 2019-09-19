import { WebClientView } from '../view/main';
import WebClientModel from '../model/main';

interface User {
    isLogin: boolean,
    name: string,
    avatarUrl: string,
    labels: string[],
};

interface Note {
    id: string,
    title: string,
}

interface Notebook {
    title: string,
    categories: {
        [key: string]: Note[]
    }
}

export default class WebClientController{
    private _view:WebClientView;
    private _model:WebClientModel;
    // private _user: User;
    // private _notebook: Notebook;
    private _editorContent: string;
    constructor(view:WebClientView, model:WebClientModel){
        this._view = view;
        this._model = model;
        // this._user = null;
        // this._notebook = null;
        this._editorContent = '';
        this._initModel();
        this._initViewListener();
    }
    public mount(container: HTMLElement | string){
        this._view.app.$mount(container);
    }

    private _initViewListener() {
        // const app = this._view.app;

        // app.$on('')
    }

    private _initModel(){
        this._fillEmptyData();
        this._model.Notebook.get();
        this._model.Category.get()
        this._model.Note.get()

        // 组装成树形

        // 填充view
        // this._view.setData('notebook', {});
    }

    private _fillEmptyData(){
        this._view.setData('editor', {
            content: '',
        });
        this._view.setData('userInfo', {});
        this._view.setData('notebook', {});
    }
}
