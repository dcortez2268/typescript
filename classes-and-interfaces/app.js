"use strict";
//abstract keyword has to be added if there is 1 or more abstract methods
class Department {
    //protected modifier is like private with difference that employees will be available in inherited classes
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // private id: string
        // name: string
        this.employees = []; // initializing here same as in constructor fn
        //shorthand for initializing
        // this.id = id
        // this.name = n
    }
    static createEmployee(name) {
        return { name, yearOfHire: Department.fiscalYear };
    }
    // setting this type lets ts know this should always reference an instance of Department
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
// static method and property
Department.fiscalYear = 2023;
// INHERITANCE
class ITDepartment extends Department {
    // getters and setters allow you to get and set properties with dot notation
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found');
    }
    set mostRecentReport(report) {
        if (!report) {
            throw new Error('Please pass in valid report');
        }
        this.addReport(report);
    }
    //base constructor by default is called if we do not add a constructor
    constructor(id, reports) {
        super(id, 'IT');
        this.reports = reports;
        //if you want to use 'this' in constructor, it has to be after super
        this.lastReport = reports[0];
    }
    // singleton design pattern method that implements private constructor
    static getInstance() {
        if (this.instance) {
            return ITDepartment.instance; //ITDepartment.instance === this.instance
        }
        ITDepartment.instance = new ITDepartment('d2', []);
    }
    addEmployee(name) {
        if (name === 'max') {
            return;
        }
        this.employees.push(name);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    //abstract method implementation
    describe() {
        console.log(`IT department id is: ${this.id}`);
    }
}
// static method and property
const employee1 = Department.createEmployee('raelynn');
console.log(employee1);
// const business = new Department('b1', 'business')
// business.addEmployee('max')
// business.addEmployee('dominick')
// console.log(business)
// const newBusiness = new ITDepartment("d2", [])
const newBusiness = ITDepartment.getInstance(); // implements singleton pattern
newBusiness.addEmployee('max');
newBusiness.addEmployee('dominick');
newBusiness.mostRecentReport = 'report 4';
newBusiness.mostRecentReport = 'report 2';
console.log(newBusiness);
