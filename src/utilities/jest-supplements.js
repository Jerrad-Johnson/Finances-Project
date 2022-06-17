export function arrayConverter(variable){
    return JSON.stringify(variable);
}

function getSingleKeyFromObject(ob, k){
    return ob[k];
}

function resetTwoArraysOfLength15ToZeros(arr){
    let x = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    return x;
}

export let getArrayAsString = arrayConverter;
export let getKey = getSingleKeyFromObject;
export let resetArr = resetTwoArraysOfLength15ToZeros;