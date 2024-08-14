
const axios = require('axios');
const registerUrl = 'http://localhost:3000/auth/register'
const loginUrl = 'http://localhost:3000/auth/login'
const testUser = 'testuser'
const testPassword = 'testpassword123!'

const random = () => {
    return Math.floor(Math.random() * 10000)
}

describe('Testing registration endpoint', () => {
    it('Register - valid username and password', async () => {
        const randomNumber = random()
        
        const response = await axios.post(registerUrl, {
            username: 'testUser' + randomNumber,
            password: 'testingpassword123!'
        })
        expect(response.status).toBe(201)
    })

    it('Register - empty username with empty password', async () => {

            const response = await axios.post(registerUrl, {
            username: '',
            password: ''
        }, {
            validateStatus: null
        })
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('Please enter a username and password')
    })

    it('Register - empty username with valid password', async() => {
        const response = await axios.post(registerUrl, {
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
        const response = await axios.post(registerUrl, {
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
        const response = await axios.post(registerUrl, {
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
        const response = await axios.post(registerUrl, {
            username: 'testUser' + randomNumber,
            password: 'testingNoNumberPassword'
        },{
            validateStatus: null
        })
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('Password must contain at least one number')
    })
})

describe('Testing login endpoint', () => {
    it('Login Successfully with valid username and password', async () => {
        const response = await axios.post(loginUrl, {
            username: testUser,
            password: testPassword
        },{
            validateStatus: null
        })
        expect(response.status).toBe(200)
    })

    it('Attempt to login with valid username and invalid password', async() => {
        const response = await axios.post(loginUrl, {
            username: testUser,
            password: 'badpass'
        },{
            validateStatus: null
        })
        expect(response.status).toBe(401)
        expect(response.data.error).toBe('Password Incorrect')
    })
    
    it('Attempt to login with user which does not exist', async () => {
        const response = await axios.post(loginUrl, {
            username: 'badUser',
            password: testPassword
        },{
            validateStatus: null
        })
        expect(response.status).toBe(401)
        expect(response.data.error).toBe('User not found')
    })

    it('Attempt to login with username and password being empty', async () => {
        const response = await axios.post(loginUrl, {
            username: '',
            password: ''
        },{
            validateStatus: null
        })
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('Please enter a username and password')
    })

    it('Attempt to login with username being empty and valid password', async () => {
        const response = await axios.post(loginUrl, {
            username: '',
            password: testPassword
        },{
            validateStatus: null
        })
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('Please enter a username')
    })

    it('Attempt to login with a valid username and empty password', async () => {
        const response = await axios.post(loginUrl, {
            username: testUser,
            password: ''
        },{
            validateStatus: null
        })
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('Please enter a password')
    })
})