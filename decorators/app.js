"use strict";
//
//  GENERICS
//
//
//
// GENERIC FUNCTIONS
function merge(objA, objB) {
    return Object.assign(Object.assign({}, objA), objB);
}
const mergedObj = merge({ name: 'Max' }, { age: 320 });
console.log(mergedObj.age);
function countAndDescribe(element) {
    let descriptionText = 'No value given';
    if (element.length === 1) {
        descriptionText = '1 value given';
    }
    else if (element.length > 1) {
        descriptionText = `${element.length} values given`;
    }
    return [element, descriptionText];
}
console.log(countAndDescribe('Hey there buddy'));
//
//
// CONSTRAINTS
function mergeConstraint(objA, objB) {
    return Object.assign(Object.assign({}, objA), objB);
}
const mergedObj2 = merge({ name: 'Max' }, { age: 320 });
console.log(mergedObj2.age);
function countAndPrint(element) {
    return [];
}
//
//
// KEYOF CONSTRAINT
function extractAndConvert(obj, key) {
    return obj[key];
}
console.log(extractAndConvert({ name: 'Dominick' }, 'name'));
//
//
// GENERIC CLASSES
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('max');
textStorage.addItem('dominick');
textStorage.addItem('manu');
textStorage.removeItem('manu');
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
const objStorage = new DataStorage();
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const names = ['dominick', 'cortez'];
// operations won't be allowed
// names.push("hi")
// names.pop()
