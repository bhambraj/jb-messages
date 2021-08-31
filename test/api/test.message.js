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
        await deleteAllMessages();
    });

    it('should not save message with empty body', (done) => {
        testApp
            .post(messagesApiRoute)
            .send()
            .expect(400)
            .end(done);
    })

    let savedMessageId;
    it('should save new message with name passed in the body', (done) => {
        const nameToBeSaved = 'Dummy Name';
         testApp
            .post(messagesApiRoute)
            .send({
                name: nameToBeSaved
            })
            .expect(201)
            .expect((res) => {
                assert(!!res.body._id, 'Saved Message was not returned to the response');
                assert.strictEqual(res.body.name, nameToBeSaved, `Expected ${nameToBeSaved} but got ${res.body.name}`);
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

    const updatedName = 'Monak';
    it('should update the message with valid message ID', (done) => {
        testApp
            .patch(`${messagesApiRoute}/${savedMessageId}`)
            .send({
                name: updatedName
            })
            .expect(200)
            .expect((res) => {
                assert.strictEqual(res.body.name, updatedName, `Unable to update the message. Expected name ${updatedName} but got ${res.body.name}`)
            })
            .end(done);
    });

    it('should not update the message with invalid message ID', (done) => {
        testApp
            .patch(`${messagesApiRoute}/5876`)
            .send({
                name: `${updatedName} UPDATED`
            })
            .expect(404)
            .end(done);
    });

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
