const alertElement = document.querySelector('.alert-area');
const pushList = []


function render() {
    while (pushList.length > 0 && alertIsReady()) {
        alertElement.innerHTML = pushList[0].html;
        let audioPlay = alertElement.querySelector('audio');
        audioPlay.volume = 0.2;


        console.dir(pushList[0])
        if (pushList[0].audioCue) audioPlay.play();
        

        alertElement.classList.add('active');
        
        setTimeout(function() {
            pushList.splice(0, 1);
            alertElement.classList.remove('active');

            setTimeout(function() {
                render(); // Waits for animation of last use
            }, 2000)
        }, 5000)
    }
}

function alertIsReady() {
    return !alertElement.classList.contains('active')
}


function composeScreen(user, headline = "", message = "", type= "", audioCue = true) {
    pushList.push({
        'html': `
        <div id="${type}">
            <h1>${headline}</h1>
            <p>${message}</p>
            <audio src="./unicorn-eat.mp3" preload="auto"></audio>
        </div>
        `,
        'type': type,
        'audioCue': audioCue
    });
}



module.exports = {composeScreen, render}