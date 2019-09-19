import RestClient from 'axios-rest-client';

type LocalStorage = 'ls' | 'realm';

interface ModelConfig {
    localStorage: LocalStorage,
    endpoint: string,
    headers: Object,
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

    private _initRestClient(endpoint: string, headers: any){
        const client = new RestClient({
            baseUrl: endpoint,
            // xsrfCookieName: 'csrfToken',
            // xsrfHeaderName: 'X-CSRF-TOKEN',
        });
        
        client._axios.interceptors.request.use((config: any) => {
            for(let key in headers){
                config.headers[key] = headers[key];
            }
            return config;
        }, (error:Error) => {
            console.log('error', error);
            throw error;
        });

        return client;
    }
}
