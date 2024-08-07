const sqlite = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve('./database', 'game.db');

const db = new sqlite.Database(dbPath, (err) => {
    if (err){
        console.log('cannot connect to the database', err);
    }
})

const initializeDatabase = () => {

    db.serialize(() => {
        const password = 'testpassword123!'
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.log('error hashing password', err);
            }
            db.run(`INSERT INTO accounts (user_id, username, password) VALUES (?,?,?)`, ['a05edb90-5708-4c74-9adb-a8d0edd38556', 'testuser', hash]);
            db.run(`INSERT INTO users (user_id, username) VALUES ('a05edb90-5708-4c74-9adb-a8d0edd38556', 'testuser')`);
        });

        db.run(`INSERT INTO monsters (monster_name, level, maxHp, hp, attack, defense, special_attack, special_defense, speed, move_1, move_2, move_3, move_4)
            VALUES ('lesser goblin', 1, 20, 20, 15, 4, 4, 4, 4, 'scratch', 'bite', NULL, NULL)
            `);

        db.run(`INSERT INTO moves (move_name, base_damage, hp_gain, attack_gain, defense_gain, special_attack_gain, special_defense_gain, speed_gain, accuracy)
            VALUES ('kick', 40, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
            ('punch', 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
            ('scratch', 40, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
            ('bite', 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
            `)
    })
}

initializeDatabase();