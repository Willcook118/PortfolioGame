const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database/db');
const uuid = require('uuid');
const {Users, getUserByUsername} = require('../models/users');
const {Account, getAccountByUsername} = require('../models/accounts');

const router = express.Router();

router.get('/register', (req, res)=> {
    res.render('register');
});

router.post('/register', async(req, res) => {
    const uuidValue = uuid.v4();
    const {username, password} = req.body;

    try {
        
        db.get(`SELECT * FROM accounts WHERE username = ?`, [username], (err, user) => {
            if (user) { return res.status(400).json({error: 'User already exists'})}
    
            if(password.length < 8) {
                return res.status(400).json({error: 'Password must be at least 8 characters long'});
            }
            if(!/[0-9]/.test(password)) {
                return res.status(400).json({error: 'Password must contain at least one number'});
            }
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) throw err;
            db.run(`INSERT INTO accounts (user_id, username, password) VALUES (?, ?, ?)`, [uuidValue, username, hash], (err) => {
                if (err) throw err;
                })
            db.run(`INSERT INTO users (user_id, username) VALUES (?, ?)`, [uuidValue, username], (err) => {
                if (err) throw err;
                    return res.status(200).json({ message: ` ${username} is registered`})
            })
            })
        })
    } catch(error) {
            console.error('Error during registration:', error);
            return res.status(500).send('Internal server error');
    }
});

router.get('/login', (req, res) => {
    res.render('login');

})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userAccount = await getAccountByUsername(username);
        const results = await bcrypt.compare(password, userAccount.password);

        if (!results) {
            return res.status(401).json({ error: 'Password Incorrect' });
        }

        const user = await getUserByUsername(username);

        req.session.username = user.username;
        req.session.level = user.level;
        req.session.userClass = user.userClass;
        req.session.user = user;

        console.log(req.session);
        
        return res.status(200).json({ message: 'Login successful' , userClass: user.userClass});
    } catch (error) {
        if (error.message === 'Account not found') {
            return res.status(401).json({ error: 'User not found' });
        } else if (error.message === 'Password Incorrect'){
            return res.status(401).json({ error: 'Password Incorrect' });
        } else {
            console.error('Error during login:', error);
            return res.status(500).send('Internal server error');
        }
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.status(200).json({ message: 'Logged out' });
        if(err) {
            return res.status(500).send('Error logging out');
        }
        console.log('logged out');
    });
})

module.exports = router;