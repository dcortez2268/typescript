"use strict";
//
//  ADVANCED TYPING
//
var _a;
let e1;
e1 = {
    name: 'Dominick',
    privileges: ['create-server'],
    startDate: new Date(),
};
function printEmployeeInformation(emp) {
    console.log(`Name: ${emp.name}`);
    if ('privileges' in emp) {
        console.log(`Privileges: ${emp.privileges}`);
    }
    if ('startDate' in emp) {
        console.log(`Start date: ${emp.startDate}`);
    }
}
printEmployeeInformation(e1);
printEmployeeInformation({ name: 'manu', startDate: new Date() });
class Car {
    drive() {
        console.log('Driving a car...');
    }
}
class Truck {
    drive() {
        console.log('Driving a truck...');
    }
    loadCargo(amount) {
        console.log(`Loading cargo with amount of: ${amount}`);
    }
}
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(15);
    }
}
useVehicle(new Car());
useVehicle(new Truck());
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log(`Moving at speed: ${speed}`);
}
console.log(moveAnimal({ type: 'bird', flyingSpeed: 10 }));
// TYPE CASTING
// both are equivalent
const userInputElement = document.getElementById('user-input');
const userElement = document.getElementById('user-input');
const errors = {
    email: 'Not a valid email',
    username: 'Must be more than six characters',
    id: 'e1',
};
function addNumbersOrStrings(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
const result = addNumbersOrStrings('dominick', 'cortez');
// OPTIONAL CHAINING
const fetchedUserData = {
    id: 'u1',
    name: 'Dominick',
    job: { title: 'Ceo', description: 'My own company' },
};
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
// NULLISH COALESCING
const userInput = '';
const storedData = userInput !== null && userInput !== void 0 ? userInput : 'Default';
