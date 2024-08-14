map =[
    ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
    ['G', 'P', 'P', 'P', 'P', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
    ['P', 'P', 'G', 'G', 'P', 'G', 'G', 'G', 'G', 'G', 'R', 'G', 'G', 'G'],
    ['G', 'G', 'G', 'G', 'P', 'P', 'P', 'P', 'G', 'R', 'R', 'R', 'G', 'G'],
    ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'P', 'G', 'G', 'G', 'G', 'G', 'G'],
    ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'P', 'G', 'G', 'G', 'G', 'G', 'G'],
    ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'P', 'G', 'G', 'G', 'P', 'P', 'P'],
    ['W', 'W', 'W', 'G', 'G', 'G', 'G', 'P', 'P', 'P', 'P', 'P', 'G', 'G'],
    ['W', 'W', 'W', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
    ['W', 'W', 'W', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G']
]

let user = {x:0, y:2} 

function renderMap(){
    const mapDiv = document.getElementById('map');
    mapDiv.innerHTML = '';

    for(let i = 0; i < map.length; i++){
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('map-row');

        for (let j = 0; j < map[i].length; j++) {
            const tileDiv = document.createElement('div');
            tileDiv.classList.add('map-tile');
            if(map[i][j] == 'G'){
                tileDiv.style.backgroundColor = 'green'
            }  
            if(map[i][j] == 'P'){
                tileDiv.style.backgroundColor = 'brown'
            } 
            if(map[i][j] == 'W'){
                tileDiv.style.backgroundColor = 'DeepSkyBlue'
            } 
            if(map[i][j] == 'R'){
                tileDiv.style.backgroundColor = 'grey'
            }

            if(user.x === j && user.y === i) {
                let img = document.createElement('img')
                img.src = '../images/basic warrior.png'
                img.classList.add('playerImg')
                tileDiv.appendChild(img)
            }

            rowDiv.appendChild(tileDiv);
        }
        mapDiv.appendChild(rowDiv);
    }
}

renderMap()

document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowUp') movePlayer(0, -1);
    if(e.key === 'ArrowRight') movePlayer(1, 0);
    if(e.key === 'ArrowDown') movePlayer(0, 1);
    if(e.key === 'ArrowLeft') movePlayer(-1, 0);
})

function movePlayer(dx, dy){
    let newX = user.x + dx;
    let newY = user.y + dy;

    if(newX >= 0 && newX < map[0].length && newY >=0 && newY < map.length){
        user.y = newY
        user.x = newX
        renderMap()
    }

}

console.log('HELLO')