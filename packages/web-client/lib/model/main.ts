import RestClient from 'axios-rest-client';

type LocalStorage = 'ls' | 'realm';

export interface Note {
    id: string,
    title: string,
}

export interface Notebook {
    title: string,
    categories: {
        [key: string]: Note[]
    }
}

interface ModelConfig {
    localStorage: LocalStorage,
    endpoint: string,
    headers: unknown,
}

export default class WebClientModel {
    private _localStorage:LocalStorage;
    private _client:any;

    public Note:any;
    public Category:any;
    public Notebook:any;
    public User:any;

    constructor(config:ModelConfig){
        this._localStorage = config.localStorage;
        this._client = this._initRestClient(config.endpoint, config.headers);
        this.Note = this._client.note;
        this.Category = this._client.category;
        this.Notebook = this._client.notebook;
        this.User = this._client.user;
    }

    public setToken(token: string){
        this._client._axios.interceptors.request.use((config: any) => {
            config.headers['x-toonote-token'] = token;
            return config;
        });
    }

    private _initRestClient(endpoint: string, headers: any){
        const client = new RestClient({
            baseUrl: endpoint,
            // xsrfCookieName: 'csrfToken',
            // xsrfHeaderName: 'X-CSRF-TOKEN',
        });

        client._axios.interceptors.request.use((config: any) => {
            for(const key in headers){
                config.headers[key] = headers[key];
            }
            return config;
        }, (error:Error) => {
            console.log('error', error);
            throw error;
        });

        /* client._axios.interceptors.response.use((response: any) => {
            if(response.status !== 200){
                throw new Error('request error, status ' + response.status);
            }
            if(!response.data){
                throw new Error('request data error, data:' + response.data);
            }
            if(response.data.code !== 0){
                throw new Error('request error, code:' + response.data.code);
            }
            console.log(response.data.data);
            return response.data.data;
        }, (error:Error) => {
            console.log('error', error);
            throw error;
        }); */

        return client;
    }
}
