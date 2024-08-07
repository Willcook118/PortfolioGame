
async function attackMonster(event, move) {
    event.preventDefault();

    try {
        await userAttack(move);
        console.log('User attack complete');
        toggleAttackButtonsDisable();
        //after 2 seconds the monster will attack
       setTimeout(()=> {
        monsterAttack()
       }, 2500);
    } catch (error) {
        console.error('Error during attack sequence:', error);
    }
}

async function updateMonsterHealthBar(remainingHp, monsterHp, damageValue, monsterName){
    const healthBar = document.querySelector('.healthBarFillMonster');
    const monsterHpValue = document.querySelector('.monsterHp');
    const battleDialog = document.querySelector('#battleDialog');

    monsterHpValue.textContent = `${monsterHp}`;
    healthBar.style.width = `${remainingHp}%`;
    if(remainingHp == 0){
        battleDialog.textContent = `${monsterName} Has been defeated!`;
        toggleAttackButtonsDisable();
    }
        
}

async function updateUserHealthBar(remainingHp, userHp, damageValue){
    const healthBar = document.querySelector('.healthBarFillUser');
    const userHpValue = document.querySelector('.userHp');
    const battleDialog = document.querySelector('#battleDialog');

    if( remainingHp == 0){
        battleDialog.textContent = `You have been defeated!`;
        toggleAttackButtonsDisable();
    }

    userHpValue.textContent = `${userHp}`;
    healthBar.style.width = `${remainingHp}%`;
}

async function userAttack(move){
    
    try {
    const response = await fetch('/game/userAttack', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({move}),
    })
    const data = await response.json();
    let battleDialog = document.querySelector('#battleDialog');
    battleDialog.textContent = `${data.userName} used ${data.moveName} and dealt ${data.damageValue} damage!`;

    updateMonsterHealthBar(data.remainingHp, data.monsterHp, data.damageValue, data.monsterName);


} catch (error) {
    console.error(error);
}

}

async function monsterAttack(){

    try {
        const response  = await fetch('/game/monsterAttack',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();

        battleDialog.textContent = `${data.monsterName} used ${data.moveName} and dealt ${data.damageValue} damage!`;

        updateUserHealthBar(data.remainingHp, data.userHp, data.damageValue);

        if(data.monsterHp == 0){
            battleDialog.textContent = `${data.monsterName} has been defeated!`;
            toggleAttackButtonsDisable();
        } else {toggleAttackButtonsEnable();}
    } catch (error) {
        console.error(error);
    }
}

function toggleAttackButtonsDisable() {
    const attackButtons = document.querySelectorAll('.battleMove');
    attackButtons.forEach((button) => {
        button.setAttribute('disabled', true);
        button.style.opacity = 0.5;
        button.style.cursor = 'not-allowed';
    })
}

function toggleAttackButtonsEnable() {
    const attackButtons = document.querySelectorAll('.battleMove');
    attackButtons.forEach((button) => {
        button.removeAttribute('disabled');
        button.style.opacity = 1;
        button.style.cursor = '';
    })
}