export function arrayConverter(variable){
    return JSON.stringify(variable);
}

export let getArrayAsString = arrayConverter;

 function getSingleKeyFromObject(ob, k){
    return ob[k];
}

export let getKey = getSingleKeyFromObject;