import { WebClientView } from '../view/main';
import WebClientModel, { Notebook } from '../model/main';

interface User {
    isLogin: boolean,
    name: string,
    avatarUrl: string,
    labels: string[],
};

export default class WebClientController{
    private _view:WebClientView;
    private _model:WebClientModel;
    // private _user: User;
    // private _notebook: Notebook;
    private _editorContent: string;
    constructor(view:WebClientView, model:WebClientModel){
        this._view = view;
        this._model = model;
        this._editorContent = '';
        this._initModel();
        this._initViewListener();
    }
    public mount(container: HTMLElement | string){
        this._view.app.$mount(container);
    }

    private _initViewListener() {
        const app = this._view.app;

        app.$on('user.login', (data: any) => {
            this._view.setData('userInfo', {
                isLogin: true,
                name: data.userInfo.name,
                avatarUrl: data.userInfo.avatarUrl,
                labels: [],
            });

            const token = localStorage.getItem('TOONOTE-TOKEN');
            if(token){
                this._model.setToken(token);
                this._refreshData();
            }
        });
    }

    private _initModel(){
        this._fillEmptyData();
    }

    
    private _fillEmptyData(){
        this._view.setData('editor', {
            content: '',
        });
        this._view.setData('userInfo', {});
        this._view.setData('notebook', {});
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
