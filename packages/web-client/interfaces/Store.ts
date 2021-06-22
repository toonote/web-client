export interface Store{
    getContent(key: string):string|null;
    setContent(key: string, value: string):void;
}
