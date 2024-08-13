const request = require('supertest');
const app = require('../app');

const random = () => {
    return Math.floor(Math.random() * 10000)
}

describe('auth endpoints', () => {
    it('Register - valid username and password', async () => {
        const randomNumber = random()
        const res = await request(app)
            .post('/auth/register')
            .send({username: 'testingUser' + randomNumber, password: 'testingpassword123!'})
            .expect(201);
            expect(res.statusCode).toBe(201);
    })

    it('Register - empty username with empty password', async () => {
        const res = await request(app)
        .post('/auth/register')
        .send({username: '', password: ''})

        expect(res.statusCode).toBe(400)
        expect(res.body.error).toBe('Please enter a username and password')
    })

    it('Register - empty username with valid password', async () => {
        const res = await request(app)
        .post('/auth/register')
        .send({username: '', password: 'testingpassword123!'})

        expect(res.statusCode).toBe(400)
        expect(res.body.error).toBe('Please enter a username')
    })

    it('Register - valid username with empty password', async () => {
        const randomNumber = random()
        const res = await request(app)
        .post('/auth/register')
        .send({username: 'testUser' + randomNumber, password: ''})

        expect(res.statusCode).toBe(400)
        expect(res.body.error).toBe('Please enter a password')
    })

    it('Register - valid username and invalid password (too short)', async () => {
        const randomNumber = random()
        const res = await request(app)
            .post('/auth/register')
            .send({username: 'testingUser' + randomNumber, password: 'badPass'})

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Password must be at least 8 characters long')
    })

    it('Register - valid username and invalid password (corrent length but no number)', async () => {
        const randoNumber = random()
        const res = await request(app)
            .post('/auth/register')
            .send({username:'testingUser' + randoNumber, password:'testingpasswordNoNumber'})

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Password must contain at least one number')
    })
})