import { Note, NoteSummary, Category, Store } from '@toonote/shared/interfaces/Store';

export interface StoreLocalOptions{
  prefix?: string;
}

type StoreType = 'NOTE' | 'CATEGORY' | 'CONFIG';

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
  async getCategory(categoryId: string): Promise<Category | null> {
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
  private getPrefix(type: StoreType, key: string): string {
    return this.prefix + '-' + type + '-' + key;
  }
}
