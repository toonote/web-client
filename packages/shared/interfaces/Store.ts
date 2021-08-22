export type UpdateWrapper<T> = T & {
  id: string;
}

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

export type NoteUpdate = Partial<NoteCreate>;

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

export type CategoryUpdate = Partial<CategoryCreate>;

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

export interface Attachment {
  id: string;
  name: string;
  size: string;
  ext: string;
  file?: File;
  blob?: Blob;
  url?: string;
  base64?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AttachmentCreate = Omit<Attachment, 'id' | 'createdAt' | 'updatedAt'>;

export interface Store{

  getConfig(key: string): Promise<unknown>;
  setConfig(key: string, value): Promise<void>;

  getNote(noteId: string): Promise<Note|null>;
  updateNote(id: string, data: NoteUpdate): Promise<void>;
  setNoteContent(noteId: string, content: string): Promise<void>;
  createNote(note: Note): Promise<Note>;
  deleteNote(noteId: string): Promise<void>;

  getCategory(categoryId: string): Promise<CategorySummary>;
  getCategoryNoteSummaryList(categoryId: string): Promise<NoteSummary[]>;
  createCategory(category: CategoryCreate): Promise<CategorySummary>;
  deleteCategory(categoryId: string): Promise<void>;
  updateCategory(categoryId: string, data: CategoryUpdate): Promise<void>;

  getNotebook(notebookId: string): Promise<NotebookSummary>
  getNotebookList(): Promise<NotebookSummary[]>;
  getNotebookWithCategories(notebookId: string): Promise<NotebookWithCategories>;
  createNotebook(data: NotebookCreate): Promise<NotebookSummary>;

  getAttachment(attachmentId: string): Promise<Attachment>;
  createAttachment(attachment: Attachment): Promise<Attachment>;
  deleteAttachment(attachmentId: string): Promise<void>;

}
