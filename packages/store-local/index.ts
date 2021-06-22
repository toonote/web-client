import { Store } from '@toonote/web-client/interfaces/Store';

export interface StoreLocalOptions{
    prefix?: string,
}

export class StoreLocal implements Store {
    private prefix:string
    constructor(options: StoreLocalOptions) {
        this.prefix = options.prefix;
        if(!this.prefix) this.prefix = 'TOONOTE_STORAGE_LOCAL-';
    }
    getContent(key: string): string|null {
        const storageKey = this.prefix + key;
        return localStorage.getItem(storageKey);
    }
    setContent(key: string, value: string): void {
        const storageKey = this.prefix + key;
        return localStorage.setItem(storageKey, value);
    }
}
