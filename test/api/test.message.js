const supertest = require('supertest');
const assert = require('assert');
const {app} = require('../../src/app');
const dbService = require('../../src/services/db');
const {removeAll: deleteAllMessages} = require('../../src/services/message');

const testApp = supertest(app);
const messagesApiRoute = '/messages';

describe('Test Message API', () => {
    before(async function setup() {
        this.timeout(6000);
        await dbService.setupConnection(); // before running all tests
        await deleteAllMessages(); // Delete all messages from DB before running
    });

    it('should not save message without value', (done) => {
        testApp
            .post(messagesApiRoute)
            .send()
            .expect(400)
            .end(done);
    })

    let savedMessageId;
    it('should create new message with value', (done) => {
        const valueToBeSaved = 'Dummy Value';
         testApp
            .post(messagesApiRoute)
            .send({
                value: valueToBeSaved
            })
            .expect(201)
            .expect((res) => {
                assert(!!res.body._id, 'Some error occured while creating the message');
                assert.strictEqual(res.body.value, valueToBeSaved, `Expected ${valueToBeSaved} but got ${res.body.value}`);
                savedMessageId = res.body._id;
            })
            .end(done);
    });

    it('should load the message with valid message ID', (done) => {
        testApp
            .get(`${messagesApiRoute}/${savedMessageId}`)
            .expect(200)
            .expect((res) => {
                assert(!!res.body._id, 'Some error occured while loading the message with ID');
                assert(res.body._id, savedMessageId, `Expected ${savedMessageId} but got ${res.body._id}`)
            })
            .end(done);
    });

    it('should return 404 when loaded with an invalid message ID', (done) => {
        testApp
            .get(`${messagesApiRoute}/gibbrish_id`)
            .expect(404)
            .end(done);
    });

    const updatedValue = 'Monak';
    it('should update the message with a valid message ID', (done) => {
        testApp
            .patch(`${messagesApiRoute}/${savedMessageId}`)
            .send({
                value: updatedValue
            })
            .expect(200)
            .expect((res) => {
                assert.strictEqual(res.body.value, updatedValue, `Unable to update the message. Expected value ${updatedValue} but got ${res.body.value}`)
            })
            .end(done);
    });

    it('should not update the message with invalid message ID', (done) => {
        testApp
            .patch(`${messagesApiRoute}/5876`)
            .send({
                value: `${updatedValue} UPDATED`
            })
            .expect(404)
            .end(done);
    });

    it('should return isPalindrome:false for a message that is not a palindrome', (done) => {
        testApp
            .get(`${messagesApiRoute}/${savedMessageId}`)
            .expect(200)
            .expect((res) => {
                assert.strictEqual(res.body.isPalindrome, false, 'Expected isPalindrome: false but got true')
            })
            .end(done);
    })

    it('Should return isPalindrome:true for a message that is a palindrome', (done) => {
        const palindromeValue = 'r a c e c a r';
        testApp
            .patch(`${messagesApiRoute}/${savedMessageId}`)
            .send({
                value: palindromeValue
            })
            .expect(200)
            .expect((res) => {
                assert.strictEqual(res.body.isPalindrome, true, 'Expected isPalindrome: true but got false')
            })
            .end(done);
    })

    it('should delete the message with valid message ID', (done) => {
        testApp
            .delete(`${messagesApiRoute}/${savedMessageId}`)
            .expect(200)
            .end(done);
    });

    it('should not delete the message with invalid message ID', (done) => {
        testApp
            .delete(`${messagesApiRoute}/gibbrish`)
            .expect(404)
            .end(done);
    });

    it('should get all the messages', (done) => {
        testApp
            .get(messagesApiRoute)
            .expect(200)
            .end(done);
    });
})
