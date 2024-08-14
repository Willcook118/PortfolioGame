const request = require('supertest');
const app = require('../app');
const axios = require('axios');
const baseUrl = 'http://localhost:3000'

const random = () => {
    return Math.floor(Math.random() * 10000)
}

describe('auth endpoints', () => {
    it('Register - valid username and password', async () => {
        const randomNumber = random()
        
        const response = await axios.post(baseUrl + '/auth/register', {
            username: 'testUser' + randomNumber,
            password: 'testingpassword123!'
        })
        expect(response.status).toBe(201)
    })

    it('Register - empty username with empty password', async () => {

            const response = await axios.post(baseUrl + '/auth/register', {
            username: '',
            password: ''
        }, {
            validateStatus: null
        })
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('Please enter a username and password')
    })

    it('Register - empty username with valid password', async() => {
        const response = await axios.post(baseUrl + '/auth/register', {
            username: '',
            password: 'testingpassword123!'
        },{
            validateStatus: null
        })
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('Please enter a username')
    })

    it('Register - valid username with empty password', async() => {
        const randomNumber = random()
        const response = await axios.post(baseUrl + '/auth/register', {
            username: 'testUser' + randomNumber,
            password: ''
        }, {
            validateStatus: null
        })
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('Please enter a password')
    })

    it('Register - valid username with invalid password (too short)', async() => {
        const randomNumber = random()
        const response = await axios.post(baseUrl + '/auth/register', {
            username: 'testUser' + randomNumber,
            password: 'badPass'
        },{
            validateStatus: null
        })
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('Password must be at least 8 characters long')
    })

    it('Register - valid username and invalid password (corrent length but no number)', async() => {
        const randomNumber = random()
        const response = await axios.post(baseUrl + '/auth/register', {
            username: 'testUser' + randomNumber,
            password: 'testingNoNumberPassword'
        },{
            validateStatus: null
        })
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('Password must contain at least one number')
    })
})