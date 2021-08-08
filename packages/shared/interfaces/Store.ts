export interface NoteSummary {
  id: string;
  title: string;
}

export interface Note extends NoteSummary {
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteSummary {
  id: string;
  title: string;
}

export interface CategorySummary {
  id: string;
  title: string;
  noteIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category extends CategorySummary {
  notes: NoteSummary[];
}

export interface NotebookSummary {
  id: string;
  title: string;
}

export interface NotebookWithCategories extends NotebookSummary {
  categories: Category[];
}

export interface Store{
  getConfig(key: string);
  setConfig(key: string, value): Promise<void>;
  getNote(noteId: string): Promise<Note|null>;
  updateNote(note: Note): Promise<void>;
  setNoteContent(noteId: string, content: string): Promise<void>;
  getCategory(categoryId: string): Promise<CategorySummary>;
  getCategoryNoteSummaryList(categoryId: string): Promise<NoteSummary[]>;
  getNotebookList(): Promise<NotebookSummary[]>;
  getNotebookWithCategories(notebookId: string): Promise<NotebookWithCategories>;
}
