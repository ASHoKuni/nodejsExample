
const { expectCt } = require('helmet');
const mathOperations = require('./calculator.jss')


describe("Calculator Tests",() =>{
    test("Addition of 2 number ",() =>{
        //arrange and act 
        const result = mathOperations.sum(1,2);
        //assert 
        expect(result).toBe(3);

    });

    test("Subtraction of 2 number",()=>{
        expect(mathOperations.diff(3,2)).toBe(1);
    })

    test("Multiplication of 2 number",()=>{
        expect(mathOperations.product(4,5)).toBe(20);
    })

    test("Division of 2 number",()=>{
        expect(mathOperations.divide(6,3)).not.toBe(3);
    })
})