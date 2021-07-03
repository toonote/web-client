import { StoreLocal } from '@toonote/store-local';

const storeLocal = new StoreLocal();

export const get = (key: string) => {
  return storeLocal.getConfigSync(key);
}

export const set = (key: string, value) => {
  storeLocal.setConfigSync(key, value);
}
