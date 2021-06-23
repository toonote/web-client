import { reactive, computed } from 'vue';
import { ViewData } from './interfaces/ViewData';


const rawData:ViewData = {
  user: null,
  editor: [],
  notebook: null,
};

export const data = reactive(rawData);

export const getData = (key: string) => {
  return computed(() => {
    const keyArr = key.trim().split('.');
    let tmp = data;
    for(let i=0; i < keyArr.length; i++){
      tmp = tmp[keyArr[i]];
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

/* interface DataPartition {
    data: unknown
}

interface Data {
    [key:string]: DataPartition
}
const data:Data = {};

export const setData = function(key: string, value: unknown){
    if(!data[key]){
        data[key] = {
            data: value
        };
    }else{
        data[key].data = value;
    }
}

export const getData = function(key: string):any{
    if(!data[key]) return null;
    return data[key];
} */
