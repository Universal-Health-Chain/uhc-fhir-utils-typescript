/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
// removed not used function removeTags: https://stackoverflow.com/questions/295566/sanitize-rewrite-html-on-the-client-side
import { validate, version, v4 } from "uuid";
const BASE64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// const sortObjKeysAlphabetically = (obj:object) => Object.keys(Object.entries(obj).sort());
export function sortStringsByAlphabet(a, b) {
    if (a.toLowerCase() < b.toLowerCase()) {
        return -1;
    }
    if (a.toLowerCase() > b.toLowerCase()) {
        return 1;
    }
    return 0;
}
// Sorts objects deeply and will also handle arrays: https://gist.github.com/CFJSGeek/5550678#gistcomment-2735297
export function sortObject(object) {
    if (object !== null && typeof object === "object") {
        return Object.keys(object)
            .sort((a, b) => sortStringsByAlphabet(a, b))
            .reduce((result, key) => {
            result[key] = object[key];
            if (Array.isArray(result[key])) {
                result[key] = result[key].map((obj) => sortObject(obj));
            }
            // //console.log("returning ORDERED object")
            return result;
        }, {});
    }
    else if (Array.isArray(object)) {
        console.warn("returning NON ordered array");
        return object.map(obj => sortObject(obj));
    }
    else {
        console.warn("returning NON ordered object");
        return object;
    }
}
/*
https://www.geeksforgeeks.org/how-to-sort-order-keys-in-javascript-objects/
// Sorted keys are obtained in 'key' array
function sortKeys(obj_1) {
    var key = Object.keys(obj_1)
    .sort(function order(key1, key2) {
        if (key1 < key2) return -1;
        else if (key1 > key2) return +1;
        else return 0;
    });
        
    // Taking the object in 'temp' object
    // and deleting the original object.
    var temp = {};
        
    for (var i = 0; i < key.length; i++) {
        temp[key[i]] = obj_1[key[i]];
        delete obj_1[key[i]];
    }

    // Copying the object from 'temp' to
    // 'original object'.
    for (var i = 0; i < key.length; i++) {
        obj_1[key[i]] = temp[key[i]];
    }
    return obj_1;
}
https://stackoverflow.com/questions/9658690/is-there-a-way-to-sort-order-keys-in-javascript-objects
*/
// https://stackoverflow.com/questions/23187013/is-there-a-better-way-to-sanitize-input-with-javascript
export function sanitizeString(str) {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
    return str.trim();
}
export function validateUUIDv4(uuidv4) {
    return (validate(uuidv4) && (version(uuidv4)) == 4);
}
export function getValidOrNewUUIDv4(uuidv4) {
    let validUUIDV4;
    if (validateUUIDv4(uuidv4))
        validUUIDV4 = uuidv4;
    else
        validUUIDV4 = v4();
    return validUUIDV4;
}
