//
//  GENERICS
//
//
//
// GENERIC FUNCTIONS
function merge<T, U>(objA: T, objB: U) {
    return { ...objA, ...objB }
}
const mergedObj = merge({ name: 'Max' }, { age: 320 })
console.log(mergedObj.age)

interface Lengthy {
    length: number
}
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'No value given'
    if (element.length === 1) {
        descriptionText = '1 value given'
    } else if (element.length > 1) {
        descriptionText = `${element.length} values given`
    }
    return [element, descriptionText]
}
console.log(countAndDescribe('Hey there buddy'))
//
//
// CONSTRAINTS
function mergeConstraint<T extends object, U extends object>(objA: T, objB: U) {
    return { ...objA, ...objB }
}
const mergedObj2 = merge({ name: 'Max' }, { age: 320 })
console.log(mergedObj2.age)

function countAndPrint<T>(element: T) {
    return []
}
//
//
// KEYOF CONSTRAINT
function extractAndConvert<T extends object, U extends keyof T>(
    obj: T,
    key: U
) {
    return obj[key]
}
console.log(extractAndConvert({ name: 'Dominick' }, 'name'))
//
//
// GENERIC CLASSES
class DataStorage<T> {
    private data: T[] = []

    addItem(item: T) {
        this.data.push(item)
    }
    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1)
    }
    getItems() {
        return [...this.data]
    }
}
const textStorage = new DataStorage<string>()
textStorage.addItem('max')
textStorage.addItem('dominick')
textStorage.addItem('manu')
textStorage.removeItem('manu')
console.log(textStorage.getItems())

const numberStorage = new DataStorage<number>()
const objStorage = new DataStorage<object>()
//
//
// GENERIC UTILITY TYPES
interface CourseGoal {
    title: string
    description: string
    completeUntil: Date
}
function createCourseGoal(title: string, description: string, date: Date) {
    let courseGoal: Partial<CourseGoal> = {}
    courseGoal.title = title
    courseGoal.description = description
    courseGoal.completeUntil = date
    return courseGoal as CourseGoal
}

const names: Readonly<string[]> = ['dominick', 'cortez']
// operations won't be allowed
// names.push("hi")
// names.pop()
