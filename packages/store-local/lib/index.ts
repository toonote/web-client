import { Note, NoteSummary, Category, CategorySummary, NotebookSummary, NotebookWithCategories, Store } from '@toonote/shared/interfaces/Store';

export interface StoreLocalOptions{
  prefix?: string;
}

type StoreType = 'NOTEBOOK_LIST' | 'CATEGORY_LIST' | 'NOTE_LIST' |
  'NOTE' | 'CATEGORY' | 'NOTEBOOK' |
  'CONFIG';

export class StoreLocal implements Store {
  private prefix:string
  constructor(options: StoreLocalOptions = {}) {
    this.prefix = options.prefix;
    if(!this.prefix) this.prefix = 'TOONOTE_STORAGE_LOCAL';
  }
  private getValue(key: string) {
    const value = localStorage.getItem(key);
    if(!value) return null;
    return JSON.parse(value);
  }
  private setValue(key: string, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }
  async getConfig(key: string) {
    return this.getValue(key);
  }
  getConfigSync(key: string) {
    return this.getValue(key);
  }
  async setConfig(key: string, value): Promise<void> {
    this.setValue(key, value);
  }
  setConfigSync(key: string, value): void {
    this.setValue(key, value);
  }
  async getNote(noteId: string): Promise<Note|null> {
    const storageKey = this.getPrefix('NOTE', noteId);
    return this.getValue(storageKey);
  }
  async updateNote(note: Note): Promise<void> {
    const storageKey = this.getPrefix('NOTE', note.id);
    this.setValue(storageKey, note);
  }
  async setNoteContent(noteId: string, content: string): Promise<void> {
    const note = await this.getNote(noteId);
    if(!note){
      throw new Error('note note exists.');
    }
    note.content = content;
    await this.updateNote(note);
  }
  async getCategoryList(notebookId: string): Promise<CategorySummary[]> {
    const storageKey = this.getPrefix('CATEGORY_LIST', notebookId)
    const categoryIdList = this.getValue(storageKey) as string[];

    const categoryList: CategorySummary[] = [];

    for(let i = 0; i < categoryList.length; i++ ) {
      const category = await this.getCategory(categoryList[i].id);
      if(!category) continue;
      categoryList.push(category);
    }

    return categoryList;
  }
  async getCategory(categoryId: string): Promise<CategorySummary | null> {
    const storageKey = this.getPrefix('CATEGORY', categoryId);
    return this.getValue(storageKey);
  }
  async getCategoryNoteSummaryList(categoryId: string): Promise<NoteSummary[]> {
    const category = await this.getCategory(categoryId);
    if(!category) return [];
    const ret: NoteSummary[] = [];
    for (let i = 0; i < category.noteIds.length; i++) {
      const note = await this.getNote(category.noteIds[i]);
      ret.push({
        id: note.id,
        title: note.title,
      });
    }
    return ret;
  }
  async getNotebookList(): Promise<NoteSummary[]> {
    const storageKey = this.getPrefix('NOTEBOOK_LIST', 'NOTEBOOK_LIST');
    return this.getValue(storageKey);
  }
  async getNotebookWithCategories(notebookId: string): Promise<NotebookWithCategories> {
    const storageKey = this.getPrefix('NOTEBOOK', notebookId);
    const notebook = this.getValue(storageKey) as NotebookWithCategories;
    if(!notebook) return null;
    const categoryList = await this.getCategoryList(notebookId);
    for (let i = 0; i < categoryList.length; i++) {
      const category = categoryList[i] as Category;
      category.notes = await this.getCategoryNoteSummaryList(category.id);
      if (!notebook.categories) {
        notebook.categories = [];
      }
      notebook.categories.push(category);
    }
    return notebook;
  }
  private getPrefix(type: StoreType, key?: string): string {
    let prefix = this.prefix + '-' + type;
    if (key) {
      prefix += '-' + key;
    }
    return prefix;
  }
}
