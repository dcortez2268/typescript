
/* 
typescript:
    js + static type system
    allows us to prevent unwanted behavior at runtime

type system:
    helps us catch errors during development
    uses type annotations to analyze our code
    only active during development
    doesn't provide any performance optimization

execution flow:
    typescript code (js + type annotations) => typescript compiler => js code

advantages:
    adds types, next-gen js features, non js features like interfaces or generics, meta programming features like decorators, rich configuraiton options, modern tooling that helps even in non typescript projects
    
    checks types and for other errors during compile time vs js having ability to check at runtime


*/

// INSTALLS
npm i -g typescript ts-node // typescript library, ts-node is cli tool, call with tsc command

/************
 TYPES: 

 number: no differentiation between integers or floats
 string
 boolean: true, false, no truthy or falsy values
 object: any js object, more specific types of object are possible
 
 *core primitive types in typescript are all lowercase!
 *types are inferred when declaring variables, although you can explicitly set the type, it is better practice to let ts infer the types

 */

