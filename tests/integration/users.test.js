// const request = require('supertest');
// const {User} = require('../../models/users');
// let server;
// describe('/api/users',() => {
//     beforeEach(() => {server = require('../../index');});
//     afterEach(async () =>{
//         server.close();
//         await User.remove({});
//     });
//     describe('GET',()=>{
//         it('should return all users ', async() =>{
//             await User.collection.insertMany([
//                 {name : 'user1',email: 'user1@gmail.com',password:'userr11'},
//                 {name : 'user2',email: 'user2@gmail.com',password:'userr22'}
//             ]);
//         const result = await request(server).get('/api/users');
//         expect(result.status).toEqual(200);
//         expect(result.body.length).toBe(2);
//         })
//     })
    
// })