/****** primitive types demo: */
function add(n1: number, n2: number, showResult: boolean, phrase: string) {
    const result = n1 + n2
    if (showResult) {
        console.log(phrase + result)
    } else {
        return result
    }
}
let number1: number //redundant, but included for demo purposes
number1 = 5

const number2 = 2.8
const printResult = true
const resultPhrase = 'Result is: '
add(number1, number2, printResult, resultPhrase)

/****** primitive object demo: */
const person = {
    name: 'joseph',
    age: 30,
    hobbies: ['sports', 'cooking'],
}
// is same as this code
const anotherPerson: {
    name: string
    age: number
    hobbies: [string, string]
    //role: [number, string] tuples have to be set here because ts does not infer correctly
} = {
    name: 'joseph',
    age: 30,
    hobbies: ['sports', 'cooking'],
    //role: [1, "admin"] tuple
}
// better practice to use first object and let typescript infer types
console.log(person)

// ARRAY
let favoriteActivities: string[]
favoriteActivities = ['Sports']

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase())
    // console.log(hobby.map()) //error because map fn is not property of string
}

// ENUM
enum Role {
    ADMIN,
    READ_ONLY,
    AUTHOR,
    USER = 8,
}
const enumPerson = {
    name: 'joseph',
    age: 30,
    role: Role.ADMIN,
}

// UNION and LITERAL and ALIAS type
type Combinable = number | string
type ConversionDesc = 'as-number' | 'as-string'

function combine(
    input1: Combinable,
    input2: Combinable,
    resultConversion: ConversionDesc
) {
    // subsequent type checking logic for unions not always required, just depends
    let result
    if (
        (typeof input1 === 'number' && typeof input2 === 'number') ||
        resultConversion === 'as-number'
    ) {
        result = +input1 + +input2
    } else {
        result = input1.toString() + input2.toString()
    }
    return result
}

// function return types
// you do not need to explicitly denote the return type, ts will infer return type, I included for demo purpose
function addNums(n1: number, n2: number): number {
    return n1 + n2
}
function printNum(num: number): void {
    console.log('result is: ' + num)
}

// function type
let functionReference: (a: number, b: number) => number
functionReference = addNums

// type checking for callback function
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2
    // ts void return type is more like documentation for suggestion, isn't enforced
    const returnedValue = cb(result)
    console.log(`The returnedValue is: ${returnedValue}`)
}
addAndHandle(10, 20, (result) => {
    return result
})

// unknown type
let userInput: unknown
let userName: string

userInput = 5
userInput = 'max'
// ts requires type check to assign fixed type to unknown type
if (typeof userInput === 'string') {
    userName = userInput
}

// never return type
function generateError(message: string, errorCode: number): never {
    throw { message, errorCode }
}
