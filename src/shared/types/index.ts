// not AI comment!
// keep in mind that the form: `type ... = ... & {}` is intentional
// check this out: https://github.com/microsoft/vscode/issues/94679#issuecomment-611320155
export type ID = string;

export type Nullable<T> = T | null;

export type RichText = string;

export type SearchMatch = Record<string, number[]> & {};

export type SearchResult = Map<ID, SearchMatch> & {};

export type DragEvent = 'drag-start' | 'drag' | 'drag-end' | 'drop' | 'pointer-down' | 'pointer-up' | 'drag-over';

export type DragAction = { type: DragEvent, payload?: any, effect?: any };

export type DragStatus = 'idle' | 'dragging' | 'dragging.active';

export type DropStatus = 'idle' | 'over';
