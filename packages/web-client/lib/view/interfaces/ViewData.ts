export interface ViewDataUser {
  name: string,
  avatarUrl: string,
}

export interface ViewDataEditor {
  content: string,
}

export interface ViewDataTreeNote {
  id: string,
  title: string,
}

export interface ViewDataTreeCategory {
  id: string,
  title: string,
  notes: ViewDataTreeNote[],
}

export interface ViewDataTreeNotebook {
  id: string,
  title: string,
  categories: ViewDataTreeCategory[],
}

export interface ViewData {
  user?: ViewDataUser,
  notebook?: ViewDataTreeNotebook,
  editor: ViewDataEditor[],
}
