//
//  GENERICS
//

// GENERIC FUNCTION
function merge<T, U>(objA: T, objB: U) {
    return { ...objA, ...objB }
}
const mergedObj = merge({ name: 'Max' }, { age: 320 })
console.log(mergedObj.age)

// CONSTRAINTS
function mergeConstraint<T extends object, U extends object>(objA: T, objB: U) {
    return { ...objA, ...objB }
}
const mergedObj2 = merge({ name: 'Max' }, { age: 320 })
console.log(mergedObj2.age)
