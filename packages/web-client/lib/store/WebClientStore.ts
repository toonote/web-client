import { CategoryCreate, CategorySummary, Note, NoteCreate, NoteUpdate, NotebookCreate, NotebookSummary, NotebookWithCategories, Store, CategoryUpdate, AttachmentCreate, Attachment } from '@toonote/shared/interfaces/Store';
import { getMimeByExtension } from '../utils/attachment';
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

  async deleteCategory(id: string): Promise<void> {
    const noteList = await this._storeInstance.getCategoryNoteSummaryList(id);
    for(const note of noteList){
      await this._storeInstance.deleteNote(note.id);
    }
    return this._storeInstance.deleteCategory(id);
  }

  async updateCategory(id: string, data: CategoryUpdate) {
    await this._storeInstance.updateCategory(id, data);
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

  async updateNote(id: string, data: NoteUpdate) {
    return this._storeInstance.updateNote(id, data);
  }

  async deleteNote(id: string): Promise<void> {
    return this._storeInstance.deleteNote(id);
  }

  async getNote(id: string): Promise<Note>{
    return this._storeInstance.getNote(id);
  }

  async createAttachment(data: AttachmentCreate): Promise<Attachment> {
    const createData: Attachment = {
      id: idGen(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    return this._storeInstance.createAttachment(createData);
  }

  async getAttachmentUrl(attachment: Attachment): Promise<string> {
    if (attachment.url) {
      return attachment.url;
    }

    if (attachment.blob || attachment.file) {
      return URL.createObjectURL(attachment.blob || attachment.file);
    }

    if (attachment.base64) {
      const mime = getMimeByExtension(attachment.ext);
      return `data:${mime};base64,${attachment.base64}`;
    }

    return '';

  }
}
