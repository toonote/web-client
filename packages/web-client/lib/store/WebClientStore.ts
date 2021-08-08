import { NotebookSummary, NotebookWithCategories, Store } from '@toonote/shared/interfaces/Store';
// import { StoreLocal } from '@toonote/store-local';


export interface WebClientStoreConfig {
    store: string,
}

export class WebClientStore {
  private _store: string;
  private _storeInstance: Store;
  static async getInstance(config:WebClientStoreConfig): Promise<WebClientStore>{
    const store = new WebClientStore(config);
    await store._initInstance();
    return store;
  }
  constructor(config:WebClientStoreConfig){
    this._store = config.store;
  }
  private async _initInstance(){
    if(this._store === '@toonote/store-local'){
      const StoreClass = (await import('@toonote/store-local')).StoreLocal;
      this._storeInstance = new StoreClass();
    }
    // console.log(this._storeInstance);
  }

  async getNotebookList(): Promise<NotebookSummary[]> {
    return this._storeInstance.getNotebookList();
  }

  async getNotebook(id: string): Promise<NotebookWithCategories> {
    return this._storeInstance.getNotebookWithCategories(id);
  }
}
