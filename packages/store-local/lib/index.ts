import localForage from 'localforage';

import { Note, NoteSummary, NoteUpdate, Category, CategorySummary, NotebookSummary, NotebookWithCategories, Store, CategoryUpdate, AttachmentCreate, Attachment } from '@toonote/shared/interfaces/Store';

export interface StoreLocalOptions{
  prefix?: string;
}

type StoreType = 'NOTEBOOK_LIST' |
  'NOTE' | 'CATEGORY' | 'NOTEBOOK' | 'ATTACHMENT' |
  'CONFIG';

export class StoreLocal implements Store {

  private prefix:string

  constructor(options: StoreLocalOptions = {}) {
    this.prefix = options.prefix;
    if(!this.prefix) this.prefix = 'TOONOTE_STORAGE_LOCAL';
    localForage.config({
      name: 'toonote',
      driver: [localForage.INDEXEDDB, localForage.LOCALSTORAGE],
    });
  }

  private async getValue(key: string): Promise<unknown> {
    const value = await localForage.getItem(key);
    return value;
  }

  private async setValue(key: string, value?: unknown): Promise<void> {
    if (value === null || value === undefined) {
      localForage.removeItem(key);
      return;
    }
    await localForage.setItem(key, value);
  }

  async getConfig(key: string) {
    return this.getValue(key);
  }

  async setConfig(key: string, value): Promise<void> {
    await this.setValue(key, value);
  }

  async getNote(noteId: string): Promise<Note|null> {
    const storageKey = this.getPrefix('NOTE', noteId);
    return this.getValue(storageKey) as Promise<Note|null>;
  }

  async updateNote(id: string, data: NoteUpdate): Promise<void> {
    const note = await this.getNote(id);
    if (!note) {
      throw new Error('note not exists.');
    }
    const newNote = {
      ...note,
      ...data,
    };
    const storageKey = this.getPrefix('NOTE', id);
    return this.setValue(storageKey, newNote);
  }

  async deleteNote(id: string): Promise<void> {
    const note = await this.getNote(id);

    const storageKey = this.getPrefix('NOTE', id);
    await this.setValue(storageKey);

    const category = await this.getCategory(note.categoryId);
    category.noteIds = category.noteIds.filter(noteId => noteId !== id);
    const categoryStorageKey = this.getPrefix('CATEGORY', note.categoryId);
    await this.setValue(categoryStorageKey, category);
  }

  async setNoteContent(noteId: string, content: string): Promise<void> {
    await this.updateNote(noteId, { content });
  }

  async createNote(data: Note): Promise<Note> {
    const storageKey = this.getPrefix('NOTE', data.id);
    await this.setValue(storageKey, data);

    const category = await this.getCategory(data.categoryId);
    category.noteIds.push(data.id);

    const categoryStorageKey = this.getPrefix('CATEGORY', data.categoryId);
    await this.setValue(categoryStorageKey, category);

    return data;
  }

  async createCategory(data: CategorySummary): Promise<CategorySummary> {
    const storageKey = this.getPrefix('CATEGORY', data.id);
    await this.setValue(storageKey, data);

    const notebook = await this.getNotebook(data.notebookId);
    notebook.categoryIds.push(data.id);

    const notebookStorageKey = this.getPrefix('NOTEBOOK', data.notebookId);
    await this.setValue(notebookStorageKey, notebook);
    return data;
  }

  async deleteCategory(categoryId: string): Promise<void> {
    const category = await this.getCategory(categoryId);
    if (!category) {
      throw new Error('category not exists.');
    }
    const notebook = await this.getNotebook(category.notebookId);
    notebook.categoryIds = notebook.categoryIds.filter(id => id !== categoryId);
    const notebookStorageKey = this.getPrefix('NOTEBOOK', category.notebookId);
    await this.setValue(notebookStorageKey, notebook);
    const categoryStorageKey = this.getPrefix('CATEGORY', categoryId);
    await this.setValue(categoryStorageKey);
  }

  async updateCategory(categoryId: string, data: CategoryUpdate): Promise<void> {
    const category = await this.getCategory(categoryId);
    if (!category) {
      throw new Error('category not exists.');
    }
    const newCategory = {
      ...category,
      ...data,
    };
    const storageKey = this.getPrefix('CATEGORY', categoryId);
    await this.setValue(storageKey, newCategory);
  }

  /* async getCategoryList(notebookId: string): Promise<CategorySummary[]> {
    const storageKey = this.getPrefix('CATEGORY_LIST', notebookId)
    const categoryIdList = this.getValue(storageKey) as string[];

    const categoryList: CategorySummary[] = [];

    for(let i = 0; i < categoryList.length; i++ ) {
      const category = await this.getCategory(categoryList[i].id);
      if(!category) continue;
      categoryList.push(category);
    }

    return categoryList;
  } */

  async getCategory(categoryId: string): Promise<CategorySummary | null> {
    const storageKey = this.getPrefix('CATEGORY', categoryId);
    return this.getValue(storageKey) as Promise<CategorySummary | null>;
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
        categoryId: note.categoryId,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      });
    }
    return ret;
  }

  async createNotebook(data: NotebookSummary): Promise<NotebookSummary> {
    const storageKey = this.getPrefix('NOTEBOOK', data.id);
    await this.setValue(storageKey, data);

    // add to notebook list
    let notebookList = await this.getNotebookList();
    if(!notebookList) notebookList = [];
    notebookList.push(data);
    const notebookStorageKey = this.getPrefix('NOTEBOOK_LIST');
    await this.setValue(notebookStorageKey, notebookList);
    return data;
  }

  async getNotebookList(): Promise<NotebookSummary[]> {
    const storageKey = this.getPrefix('NOTEBOOK_LIST');
    return this.getValue(storageKey) as Promise<NotebookSummary[]>;
  }

  async getNotebook(notebookId: string): Promise<NotebookSummary> {
    const storageKey = this.getPrefix('NOTEBOOK', notebookId);
    return this.getValue(storageKey) as Promise<NotebookSummary>;
  }

  async getNotebookWithCategories(notebookId: string): Promise<NotebookWithCategories> {
    const storageKey = this.getPrefix('NOTEBOOK', notebookId);
    const notebook = (await this.getValue(storageKey)) as NotebookWithCategories;
    if(!notebook) return null;
    for (let i = 0; i < notebook.categoryIds.length; i++) {
      const category = await this.getCategory(notebook.categoryIds[i]) as Category;
      category.notes = await this.getCategoryNoteSummaryList(category.id);
      if (!notebook.categories) {
        notebook.categories = [];
      }
      notebook.categories.push(category);
    }
    return notebook;
  }

  async createAttachment(attachment: Attachment): Promise<Attachment> {
    const storageKey = this.getPrefix('ATTACHMENT', attachment.id);
    await this.setValue(storageKey, attachment);
    return attachment;
  }

  async getAttachment(attachmentId: string): Promise<Attachment> {
    const storageKey = this.getPrefix('ATTACHMENT', attachmentId);
    return this.getValue(storageKey) as Promise<Attachment>;
  }

  async deleteAttachment(attachmentId: string): Promise<void> {
    const storageKey = this.getPrefix('ATTACHMENT', attachmentId);
    await this.setValue(storageKey);
  }

  private getPrefix(type: StoreType, key?: string): string {
    let prefix = this.prefix + '-' + type;
    if (key) {
      prefix += '-' + key;
    }
    return prefix;
  }
}
