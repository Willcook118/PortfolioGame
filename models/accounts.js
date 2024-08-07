const sqlite3 = require('sqlite3');
const db = require('../database/db');
const uuid = require('uuid');

function Account (id, user_id, username, password, created_at) {
    this.id = id;
    this.user_id = user_id;
    this.username = username;
    this.password = password;
    this.created_at = created_at;
}

const getAccountByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM accounts WHERE username = ?`, [username], (err, account) => {
            if (err) {
                return reject(err);
            }
            if (!account) {
                return reject(new Error('Account not found'));
            }
            
            const newAccount = new Account(
                account.id,
                account.user_id,
                account.username,
                account.password,
                account.created_at
            );
            resolve(newAccount);
        });
    })
}

module.exports = {Account, getAccountByUsername};