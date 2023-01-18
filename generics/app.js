"use strict";
//
//  GENERICS
//
// GENERIC FUNCTION
function merge(objA, objB) {
    return Object.assign(Object.assign({}, objA), objB);
}
const mergedObj = merge({ name: 'Max' }, { age: 320 });
console.log(mergedObj.age);
// CONSTRAINTS
function mergeConstraint(objA, objB) {
    return Object.assign(Object.assign({}, objA), objB);
}
const mergedObj2 = merge({ name: 'Max' }, { age: 320 });
console.log(mergedObj2.age);
