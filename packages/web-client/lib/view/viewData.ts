import { reactive, computed } from 'vue';
import { ViewData } from './interfaces/ViewData';


const rawData:ViewData = {
  user: null,
  editor: [],
  notebook: null,
};

export const data = reactive(rawData);

// const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
// type ValueOf<T> = T[keyof T];

export const getData = (key: string) => {
  return computed(() => {
    const keyArr = key.trim().split('.');
    let tmp = data;
    for(let i=0; i < keyArr.length; i++){
      // const keyPart = keyArr[i] as (keyof typeof tmp);
      // tmp = getProperty(tmp, keyPart) as (ValueOf<typeof tmp>);
      // 用ReturnType?
      const keyPart = keyArr[i];
      tmp = tmp[keyPart];
      if(typeof tmp === 'undefined'){
        return tmp;
      }
    }
    return tmp;
  });
};

export const setData = (key: string, value: unknown):void => {
  const keyArr = key.trim().split('.');
  let tmp = data;
  for (let i = 0; i < keyArr.length; i++) {
    if(i === keyArr.length - 1){
      tmp[keyArr[i]] = value;
    }else{
      if(!tmp[keyArr[i]]) tmp[keyArr[i]] = {};
    }
    tmp = tmp[keyArr[i]];
  }
};
