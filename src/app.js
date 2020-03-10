var ComfyJS = require("comfy.js");

const alertElement = document.querySelector('.alert-area');
const pushList = []

const soapboxes = [
    "CSS gets no respect",
    "Rule of Least power",
    "Servers are a pain",
    "CSS is awesome",
    "Fault tolerance in CSS",
    "Hiring in tech",
    "The role of Philosophy education"
]

const musicStations = [ 
    "Random",
    "Epic",
    "EDM",
    "Rock",
    "Ambient",
    "Upbeat",
    "Pop",
    "Happy",
    "Hype",
    "Chiptune",
    "Synthwave"
]



const stationsString = musicStations.join(', ');

function randomRant() {
    return soapboxes[Math.floor(Math.random()*soapboxes.length)];

}

function composeScreen(user, headline, message, type) {

    pushList.push({
        'html': `
        <div id="${type}">
            <h1>${headline}</h1>
            <p>${message}</p>
            <audio src="./fairy-chime.mp3" preload="auto"></audio>
        </div>
        `,
        'type': type
    });
}

function render() {
    while (pushList.length > 0 && alertIsReady()) {
        alertElement.innerHTML = pushList[0].html;

        let audioPlay = alertElement.querySelector('audio');
        audioPlay.volume = 0.2;
        audioPlay.play();

        alertElement.classList.add('active');
        
        setTimeout(function() {
            pushList.splice(0, 1);
            console.log(pushList);
            alertElement.classList.remove('active');

            setTimeout(function() {
                render(); // Waits for animation of last use
            }, 1000)
        }, 5000)
    }
}

function alertIsReady() {
    return !alertElement.classList.contains('active')
}


ComfyJS.onChat = ( user, message, flags, self, extra ) => {
    if (flags.customReward) {
        console.log(message);
        switch (extra.customRewardId) {
            case "9f031da9-695f-44af-964d-127205d267a4":            
                composeScreen(user, `${user} wants a rant! <br> Random Topic: <em>${randomRant()}</em>`, `<strong>${user} said:</strong> ${message}`, 'soapbox');
                render();
                break;
            case "10478acd-5368-4b69-a668-2655874b8e2c":
                composeScreen(user, `${user} wants to change song!`, `<strong>${user} said:</strong> ${message}`, 'JAM');
                ComfyJS.Say(`Hey, @${user}! Be sure to tell Bryan what sort of music you want! Choose from these: ${stationsString}`)
                render();
                break;

            default:
                break;
        }
    }
}

ComfyJS.Init( process.env.TWITCHUSER, process.env.OAUTH);
