import { Store } from '@toonote/shared/interfaces/Store';
// import { StoreLocal } from '@toonote/store-local';

/* export interface Note {
    id: string,
    title: string,
}

export interface Notebook {
    title: string,
    categories: {
        [key: string]: Note[]
    }
}
*/

export interface WebClientStoreConfig {
    store: string,
}

export class WebClientStore {
  private _store: string;
  private _storeInstance: Store;
  constructor(config:WebClientStoreConfig){
    this._store = config.store;
    // test
    this._initInstance();
  }
  private async _initInstance(){
    if(this._store === '@toonote/store-local'){
      const StoreClass = (await import('@toonote/store-local')).StoreLocal;
      this._storeInstance = new StoreClass();
    }
    // console.log(this._storeInstance);
  }
}
