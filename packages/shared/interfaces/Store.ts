export interface NoteSummary {
  id: string;
  title: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Note extends NoteSummary {
  content: string;
}

export type NoteCreate = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export interface CategorySummary {
  id: string;
  title: string;
  notebookId: string;
  noteIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category extends CategorySummary {
  notes: NoteSummary[];
}

export type CategoryCreate = Omit<CategorySummary, 'id' | 'createdAt' | 'updatedAt' | 'noteIds'>;

export interface NotebookSummary {
  id: string;
  title: string;
  categoryIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface NotebookWithCategories extends NotebookSummary {
  categories: Category[];
}

export type NotebookCreate = Omit<NotebookSummary, 'id' | 'createdAt' | 'updatedAt' | 'categoryIds'>;

export interface Store{
  getConfig(key: string);
  setConfig(key: string, value): Promise<void>;
  getNote(noteId: string): Promise<Note|null>;
  updateNote(note: Note): Promise<void>;
  setNoteContent(noteId: string, content: string): Promise<void>;
  createNote(note: Note): Promise<Note>
  getCategory(categoryId: string): Promise<CategorySummary>;
  getCategoryNoteSummaryList(categoryId: string): Promise<NoteSummary[]>;
  createCategory(category: CategoryCreate): Promise<CategorySummary>;
  getNotebook(notebookId: string): Promise<NotebookSummary>
  getNotebookList(): Promise<NotebookSummary[]>;
  getNotebookWithCategories(notebookId: string): Promise<NotebookWithCategories>;
  createNotebook(data: NotebookCreate): Promise<NotebookSummary>;
}
