async function selectClass(event, userClass){
    event.preventDefault();

    const response = await fetch('/game/selectClass', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ class: userClass })
    });

    if(response.status === 200){
        window.location.href = '/game/introBattle';
    }
}