import { CategoryCreate, CategorySummary, Note, NoteCreate, NotebookCreate, NotebookSummary, NotebookWithCategories, Store } from '@toonote/shared/interfaces/Store';
import { idGen } from './idGen';
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

  async createNotebook(data: NotebookCreate): Promise<NotebookSummary>{
    const createData: NotebookSummary = {
      id: idGen(),
      createdAt: new Date(),
      updatedAt: new Date(),
      categoryIds: [],
      ...data,
    };
    return this._storeInstance.createNotebook(createData);
  }

  async createCategory(data: CategoryCreate): Promise<CategorySummary>{
    const createData: CategorySummary = {
      id: idGen(),
      createdAt: new Date(),
      updatedAt: new Date(),
      noteIds: [],
      ...data,
    };
    return this._storeInstance.createCategory(createData);
  }

  async createNote(data: NoteCreate): Promise<Note>{
    const createData: Note = {
      id: idGen(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    return this._storeInstance.createNote(createData);
  }
}
