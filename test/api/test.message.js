const supertest = require('supertest');
const assert = require('assert');
const app = require('../../src/app');

const superAgent = supertest(app);
const messagesApiRoute = '/messages';


describe('Test Message API', () => {
    it('should get all the messages', (done) => {
        superAgent
            .get(messagesApiRoute)
            .expect(200, done)();
    });
    it('should save new message', (done) => {
        const reqPayload = {
            name: 'John Doe'
        };
        superAgent
            .post(messagesApiRoute)
            .expect(201)
            .end(done)();
    });
    // it('should load the message with ID', (done) => {
    //     done();
    // });
    // it('should return 400 when loading message with incorrect ID', (done) => {
    //     done();
    // });
    // it('should update the message', (done) => {
    //     done();
    // });
    // it('should delete the message', (done) => {
    //     done();
    // });
})
