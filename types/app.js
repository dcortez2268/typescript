/****** primitive types demo: */
function add(n1, n2, showResult, phrase) {
    var result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    else {
        return result;
    }
}
var number1; //redundant, but included for demo purposes
number1 = 5;
var number2 = 2.8;
var printResult = true;
var resultPhrase = 'Result is: ';
add(number1, number2, printResult, resultPhrase);
/****** primitive object demo: */
var person = {
    name: 'joseph',
    age: 30,
    hobbies: ['sports', 'cooking']
};
// is same as this code
var anotherPerson = {
    name: 'joseph',
    age: 30,
    hobbies: ['sports', 'cooking']
};
// better practice to use first object and let typescript infer types
console.log(person);
// ARRAY
var favoriteActivities;
favoriteActivities = ['Sports'];
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
    // console.log(hobby.map()) //error because map fn is not property of string
}
// ENUM
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
    Role[Role["USER"] = 8] = "USER";
})(Role || (Role = {}));
var enumPerson = {
    name: 'joseph',
    age: 30,
    role: Role.ADMIN
};
function combine(input1, input2, resultConversion) {
    // subsequent type checking logic for unions not always required, just depends
    var result;
    if ((typeof input1 === 'number' && typeof input2 === 'number') ||
        resultConversion === 'as-number') {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
// function return types
// you do not need to explicitly denote the return type, ts will infer return type, I included for demo purpose
function addNums(n1, n2) {
    return n1 + n2;
}
function printNum(num) {
    console.log('result is: ' + num);
}
// function type
var functionReference;
functionReference = addNums;
// type checking for callback function
function addAndHandle(n1, n2, cb) {
    var result = n1 + n2;
    // ts return types are more like documentation for suggestion of how to use code, they aren't enforced
    var returnedValue = cb(result);
    console.log("The never returnedValue is: ".concat(returnedValue));
}
addAndHandle(10, 20, function (result) {
    return result;
});
// unknown type
var userInput;
var userName;
userInput = 5;
userInput = 'max';
// ts requires type check to assign fixed type to unknown type
if (typeof userInput === 'string') {
    userName = userInput;
}
