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
}
// is same as this code
const anotherPerson: {
    name: string
    age: number
} = {
    name: 'anotherJoseph',
    age: 30,
}
// better practice to use first object and let typescript infer types
console.log(person)
