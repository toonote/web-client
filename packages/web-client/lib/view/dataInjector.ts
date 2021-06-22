interface DataPartition {
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
}
