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
    age: 30
};
console.log(person);
