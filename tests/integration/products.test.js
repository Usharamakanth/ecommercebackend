const request = require('supertest');
const {Product} = require('../../models/products');
let server;
describe('/api/products',() => {
    beforeEach(() => {server = require('../../index');});
    afterEach(async () =>{
        server.close();
        await Product.remove({});
    });
    describe('GET',() =>{
        it('should return all products', async() =>{
            // insert fake data in db
            await Product.collection.insertMany([
                {name : 'product1',category : 'Men'},
                {name : 'product2',category: 'Women'}
            ]);
            // call the api
            const result = await request(server).get('/api/products');
            // assert the returned values/data
            expect(result.status).toEqual(200);
            expect(result.body.length).toBe(2);
            // clear data
            // console.log(result.body);
        })
    })
//     describe("GET/:productId" , () => {
//         it("Should return a product with given id ",async () => {
//            const product = new Product( {name: "product1", category:"Men"});
//            await product.save();
 
//            const res = await request(server).get("/api/products/"+product._id);
//            expect(res.status).toBe(200);
//           expect(res.body).toMatchObject({name:"product1"});
//         });
//     })
})