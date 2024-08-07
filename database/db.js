const sqlite = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve('./database', 'game.db');

const db = new sqlite.Database(dbPath, (err) => {
    if (err){
        console.log('cannot connect to the database', err);
    }
})

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
        user_id TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        level INTEGER DEFAULT 1,
        xp INTEGER DEFAULT 0,
        userClass TEXT DEFAULT 'none',
        maxHp INTEGER DEFAULT 25,
        hp INTEGER DEFAULT 25,
        attack INTEGER DEFAULT 10,
        special_attack INTEGER DEFAULT 10,
        defense INTEGER DEFAULT 10,
        special_defense INTEGER DEFAULT 10,
        speed INTEGER DEFAULT 10,
        move_1 TEXT DEFAULT 'punch',
        move_2 TEXT DEFAULT 'kick',
        move_3 TEXT DEFAULT NULL,
        move_4 TEXT DEFAULT NULL)`)

    db.run(`CREATE TABLE IF NOT EXISTS monsters (
        monster_id INTEGER PRIMARY KEY AUTOINCREMENT,
        monster_name TEXT NOT NULL,
        level INTEGER DEFAULT 1,
        maxHp INTEGER DEFAULT 100,
        hp INTEGER DEFAULT 100,
        attack INTEGER DEFAULT 10,
        defense INTEGER DEFAULT 10,
        special_attack INTEGER DEFAULT 10,
        special_defense INTEGER DEFAULT 10,
        speed INTEGER DEFAULT 10,
        move_1 TEXT DEFAULT 'punch',
        move_2 TEXT DEFAULT 'kick',
        move_3 TEXT DEFAULT NULL,
        move_4 TEXT DEFAULT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS moves(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        move_name TEXT NOT NULL,
        base_damage INTEGER DEFAULT NULL,
        hp_gain INTEGER DEFAULT NULL,
        attack_gain INTEGER DEFAULT NULL,
        defense_gain INTEGER DEFAULT NULL,
        special_attack_gain INTEGER DEFAULT NULL,
        special_defense_gain INTEGER DEFAULT NULL,
        speed_gain INTEGER DEFAULT NULL,
        accuracy INTEGER DEFAULT NULL
    )`);
    });



module.exports = db