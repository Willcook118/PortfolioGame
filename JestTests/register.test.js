const request = require('supertest');
const app = require('../app');

describe('auth endpoints', () => {
    it('Registering scenarios', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({username: "testingUser", password: "testingpassword123!"})
            .expect(200)
    })
})
