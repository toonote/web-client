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

export interface Category {
  id: string;
  title: string;
  noteIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Store{
  getConfig(key: string);
  setConfig(key: string, value): Promise<void>;
  getNote(noteId: string): Promise<Note|null>;
  updateNote(note: Note): Promise<void>;
  setNoteContent(noteId: string, content: string): Promise<void>;
  getCategory(categoryId: string): Promise<Category>;
  getCategoryNoteSummaryList(categoryId: string): Promise<NoteSummary[]>;
}
