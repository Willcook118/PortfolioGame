const sqlite3 = require('sqlite3')
const db = require('../database/db')

function Moves(id, move_name, base_damage, hp_gain, attack_gain, defense_gain, special_attack_gain, special_defense_gain, speed_gain, accuracy){
    this.id = id
    this.move_name = move_name
    this.base_damage = base_damage
    this.hp_gain = hp_gain
    this.attack_gain = attack_gain
    this.defense_gain = defense_gain
    this.special_attack_gain = special_attack_gain
    this.special_defense_gain = special_defense_gain
    this.speed_gain = speed_gain
    this.accuracy = accuracy
}

const getMoveByName = (moveName) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM moves WHERE move_name = ?`, [moveName], (err, move) => {
            if(err){
                return reject(err, null)
            };
            if(!move){
                return reject(err, null)
            };
            const newMove = new Moves(
                move.id,
                move.move_name,
                move.base_damage,
                move.hp_gain,
                move.attack_gain,
                move.defense_gain,
                move.special_attack_gain,
                move.special_defense_gain,
                move.speed_gain,
                move.accuracy

            );
            resolve(newMove);
        })
    })
}

module.exports = {Moves, getMoveByName}