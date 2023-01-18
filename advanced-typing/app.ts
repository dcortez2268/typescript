//
//  ADVANCED TYPING
//

// INTERSECTION TYPES
type Admin = {
    name: string
    privileges: string[]
}
type Employee = {
    name: string
    startDate: Date
}
type ElevatedEmployee = Admin & Employee
let e1: ElevatedEmployee
e1 = {
    name: 'Dominick',
    privileges: ['create-server'],
    startDate: new Date(),
}

// TYPE GUARDS
type UnknownEmployee = Employee | Admin
function printEmployeeInformation(emp: UnknownEmployee) {
    console.log(`Name: ${emp.name}`)
    if ('privileges' in emp) {
        console.log(`Privileges: ${emp.privileges}`)
    }
    if ('startDate' in emp) {
        console.log(`Start date: ${emp.startDate}`)
    }
}
printEmployeeInformation(e1)
printEmployeeInformation({ name: 'manu', startDate: new Date() })

class Car {
    drive() {
        console.log('Driving a car...')
    }
}
class Truck {
    drive() {
        console.log('Driving a truck...')
    }
    loadCargo(amount: number) {
        console.log(`Loading cargo with amount of: ${amount}`)
    }
}
type Vehicle = Car | Truck
function useVehicle(vehicle: Vehicle) {
    vehicle.drive()
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(15)
    }
}
useVehicle(new Car())
useVehicle(new Truck())

// DISCRIMINATED UNIONS
interface Bird {
    type: 'bird'
    flyingSpeed: number
}
interface Horse {
    type: 'horse'
    runningSpeed: number
}
type Animal = Bird | Horse
function moveAnimal(animal: Animal) {
    let speed
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed
            break
        case 'horse':
            speed = animal.runningSpeed
    }
    console.log(`Moving at speed: ${speed}`)
}
console.log(moveAnimal({ type: 'bird', flyingSpeed: 10 }))

// TYPE CASTING
// both are equivalent
const userInputElement = <HTMLInputElement>document.getElementById('user-input')
const userElement = document.getElementById('user-input') as HTMLInputElement

// INDEX TYPES
interface ErrorContainer {
    //property names must be able to be interpreted to string and value must be a string
    [prop: string]: string
    id: string // we can add any predefined properties but need to be of same type
}
const errors: ErrorContainer = {
    email: 'Not a valid email',
    username: 'Must be more than six characters',
    id: 'e1',
}

// FUNCTION OVERLOADS
type Combinable = number | string
function addNumbersOrStrings(a: number, b: number): number
function addNumbersOrStrings(a: string, b: string): string
function addNumbersOrStrings(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString()
    }
    return a + b
}
const result = addNumbersOrStrings('dominick', 'cortez')

// OPTIONAL CHAINING
const fetchedUserData = {
    id: 'u1',
    name: 'Dominick',
    job: { title: 'Ceo', description: 'My own company' },
}
console.log(fetchedUserData?.job?.title)

// NULLISH COALESCING
const userInput = ''
const storedData = userInput ?? 'Default'
