import { StoreLocal } from '@toonote/store-local';

const storeLocal = new StoreLocal();

export const get = async (key: string) => {
  return storeLocal.getConfig(key);
}

export const set = async (key: string, value: unknown) => {
  storeLocal.setConfig(key, value);
}
