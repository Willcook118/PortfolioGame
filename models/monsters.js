const sqlite3 = require('sqlite3');
const db = require('../database/db');

function Monster(monster_id, monster_name, level, maxHp, hp, attack, defense, special_attack, special_defense, speed, move_1, move_2, move_3, move_4) {
    this.monster_id = monster_id;
    this.monster_name = monster_name;
    this.level = level;
    this.maxHp = maxHp;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.special_attack = special_attack;
    this.special_defense = special_defense;
    this.speed = speed;
    this.move_1 = move_1;
    this.move_2 = move_2;
    this.move_3 = move_3;
    this.move_4 = move_4;

}

const getMonsterByName = (monster_name) => {
    return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM monsters WHERE monster_name = ?`, [monster_name], (err, monster) => {
            if (err) {
                return reject(err, null);
            }
            if (!monster) {
                return reject(new Error('Monster not found'), null);
            }
            const newMonster = new Monster(
                monster.monster_id,
                monster.monster_name,
                monster.level,
                monster.maxHp,
                monster.hp,
                monster.attack,
                monster.defense,
                monster.special_attack,
                monster.special_defense,
                monster.speed,
                monster.move_1,
                monster.move_2,
                monster.move_3,
                monster.move_4
            );
            resolve(newMonster);
        });
    });
}


module.exports = {Monster, getMonsterByName};