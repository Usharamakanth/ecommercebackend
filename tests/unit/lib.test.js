const lib = require('./lib');
const db = require('./db');
const mail = require('./mail');
describe("absolute", () =>{
it("should return positive number when input is positive",() =>{
    const result = lib.absolute(1);
    expect(result).toBe(1);
});
it("should return positive number when input is negetive",() =>{
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
it("should return 0 when input is 0",() =>{
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});    
describe("greet", () => {
    it("Should return a greet string with given name", () => {
        const result = lib.greet("Sreenu");
        expect(result).toMatch(/Sreenu/);
        // expect(result).toContain("Sreenu");
    })
});
//testing arrays
describe("currencies", () => {
    it("Should return provided currencies" , () => {
        const result = lib.getCurrencies();
        //Tooooo general 
        // expect(result).not.toBeNull();
        //Toooooo specific
        // expect(result[0]).toBe("USD");
        // expect(result[2]).toBe("EUR");
        //Proper way
        expect(result).toContain("INR");
        //Ideal way
        // expect(result).toEqual(expect.arrayContaining(["INR","EUR"]));
    })
})

describe("products", () => {
    it("Should return a product with given id and price" ,() => {
        const result = lib.getProduct(1);
        //Dont use toBe for object comparison
    //    expect(result).toBe({id:1,price:10});
        expect(result).toEqual({id:1,price:10});
        // expect(result).toMatchObject({id:1,price:10});
    });
})

// //Testing exception
describe("registerUser",() => {
    it("Should throw an exception for falsy username",() =>{
        //Falsy  : null , undefined , NaN , 0 , "" , false
        //const result = lib.registerUser(null);
        const falsyArgs = [null,undefined,NaN,0,"" , false];
        falsyArgs.forEach(a => {
            expect(() => { lib.registerUser(a)}).toThrow();
        });
    });

    it("Should return a user with given name" , () => {
       const result = lib.registerUser("Sreenu");
       expect(result).toMatchObject({username:"Sreenu"});
       expect(result.id).toBeGreaterThan(0);
    });
})

// //mocking functions
describe("applyDiscount", () => {
    it("Should apply discount for customer with morethan 10 poinst", () => {
       
        db.getCustomerSync = function(customerId){ 
            console.log('My mock function..');
            return { id: customerId, points: 11 };
          }

        const order = {customerId:1, totalPrice: 10};
        lib.applyDiscount(order);
        expect(order.totalPrice).toEqual(9);
    });
});
describe('notifyCustomer',() =>{
    it('should notify the customer who placed order',()=>{
        db.getCustomerSync = function(customerId){
            console.log('My mock functions');
            return 
        }
    })
})