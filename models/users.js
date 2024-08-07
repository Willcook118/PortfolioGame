const sqlite3 = require('sqlite3');
const db = require('../database/db');

function Users(user_id, username, level, xp, userClass, maxHp, hp, attack, special_attack, defense, special_defense, speed, move_1, move_2, move_3, move_4) {
    this.user_id = user_id;
    this.username = username;
    this.level = level;
    this.xp = xp;
    this.userClass = userClass;
    this.maxHp = maxHp;
    this.hp = hp;
    this.attack = attack;
    this.special_attack = special_attack;
    this.defense = defense;
    this.special_defense = special_defense;
    this.speed = speed;
    this.move_1 = move_1;
    this.move_2 = move_2;
    this.move_3 = move_3;
    this.move_4 = move_4;

}

const getUserByUsername = (username) => {
    return new Promise ((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err) {
            return reject(err, null);
        }
        if (!user) {
            return reject(new Error('User not found'), null);
        }
        const newUser = new Users(
            user.user_id,
            user.username,
            user.level,
            user.xp,
            user.userClass,
            user.maxHp,
            user.hp,
            user.attack,
            user.special_attack,
            user.defense,
            user.special_defense,
            user.speed,
            user.move_1,
            user.move_2,
            user.move_3,
            user.move_4
        );
        resolve(newUser);
    })
});
}


module.exports = {Users, getUserByUsername};