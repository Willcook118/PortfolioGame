const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database/db');
const uuid = require('uuid');
const {Monster, getMonsterByName} = require('../models/monsters');
const {Users, getUserByUsername} = require('../models/users');
const {Moves, getMoveByName } = require('../models/moves')

const router = express.Router();

router.get('/newUserSelectionPage', (req, res) => {
    console.log(req.session)
    res.render('newUserSelectionPage');
})

router.post('/selectClass', (req, res) => {
    
    try{
    const username = req.session.username
    let userClass = req.body.class;
    if (userClass.includes('_')){
        userClass = userClass.replace(/_/g, ' ');
    }
    console.log(userClass);
    db.run(`UPDATE users SET userClass =? WHERE username = ?`, [userClass, username])

    req.session.userClass = userClass;
    console.log(req.session);
    res.status(200).json({message: 'Class selected'})
} catch (error) {
    res.status(500).json({error: 'Internal server error'})
}
})

router.get('/introBattle', async (req, res)=> {
    
    let monster = await getMonsterByName('lesser goblin');
    req.session.monster = monster;
    res.render('introBattle', {monster});
})

router.post('/userAttack', async (req, res) => {
    try {
        let user = req.session.user
        let monster = req.session.monster
        let {move} = req.body
        moveDetails = await getMoveByName(user[move])

        let damage = Math.ceil((((((2 * user.level)/5) + 2) * moveDetails.base_damage * (user.attack / monster.defense) + 2) / 50))
        console.log(damage)
        monster.hp = monster.hp - damage;
        if(monster.hp <= 0){
            monster.hp = 0;
        }
        req.session.monster = monster;
        let remainingHpPercentage = Math.ceil((monster.hp / monster.maxHp) * 100)
        res.json({ remainingHp: remainingHpPercentage, monsterHp: monster.hp, damageValue: damage, monsterName: monster.monster_name, userName: user.username, moveName: moveDetails.move_name })
    } catch (err) {
        console.log(err)
    }
})

router.post('/monsterAttack', async (req, res) => {
    try {
        let user = req.session.user
        let monster = req.session.monster
        let counter = Math.ceil(Math.random() * 2)
        let move = `move_${counter}`
        moveDetails = await getMoveByName(monster[move])


        let damage = Math.ceil((((((2 * monster.level)/5) + 2) * moveDetails.base_damage * (monster.attack / user.defense) + 2) / 50))
        console.log(damage)
        user.hp = user.hp - damage;
        if (user.hp <= 0){
            user.hp = 0;
        }
        req.session.user = user;
        let remainingHpPercentage = Math.ceil((user.hp / user.maxHp) * 100)

        res.json({ remainingHp: remainingHpPercentage, userHp: user.hp, damageValue: damage, monsterName: monster.monster_name, moveName: moveDetails.move_name, monsterHp: monster.hp })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/homepage', (req, res) => {
    res.render('homepage');
})

module.exports = router;