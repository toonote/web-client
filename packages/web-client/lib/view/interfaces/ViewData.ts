import { NotebookWithCategories } from '@toonote/shared/interfaces/Store';

export interface ViewDataUser {
  name: string,
  avatarUrl: string,
}

export interface ViewDataEditor {
  content: string,
}

export interface ViewData {
  user?: ViewDataUser,
  notebook?: NotebookWithCategories,
  editor: ViewDataEditor[],
}
