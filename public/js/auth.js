async function login(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username)
    console.log(password)
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    
    console.log(data)

    if (response.status === 200 && data.userClass === 'none') {
        window.location.href = '/game/newUserSelectionPage';
    } else if (response.status === 200 && data.userClass !== 'none') {
        window.location.href = '/game/homepage';
    }

    if(data.error === "User not found"){
        alert('User not found');
    }

    if(data.error === "Password Incorrect"){
        alert('Password Incorrect');
    }
}

async function register(event){
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username)
    console.log(password)

    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if(response.status === 201){
        window.location.href = '/auth/login';
    }
    if(data.error === 'User already exists'){
        alert('User already exists');
    }
    if(data.error === 'Password must be at least 8 characters long'){
        alert('Password must be at least 8 characters long');
    }
    if(data.error === 'Password must contain at least one number'){
        alert('Password must contain at least one number');
    }
}

async function logout(event){
    event.preventDefault();

    const response = await fetch('/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.status === 204){
        window.location.href = '/auth/login';
    }
}