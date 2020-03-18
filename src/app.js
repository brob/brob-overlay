import "babel-polyfill";
require('dotenv').config()


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

function composeScreen(user, headline = "", message = "", type= "", audioCue = true) {
console.log('audio cue value', audioCue);
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


ComfyJS.onChat = ( user, message, flags, self, extra ) => {
    if (flags.customReward) {

        switch (extra.customRewardId) {
            case "9f031da9-695f-44af-964d-127205d267a4":            
                composeScreen(user, `${user} fed me! <br> Give them a rant! <br> Random Topic: <em>${randomRant()}</em>`, `<strong>${user} said:</strong> ${message}`, 'soapbox');
                render();
                break;
            case "10478acd-5368-4b69-a668-2655874b8e2c":
                composeScreen(user, `${user} fed me and wants to change song!`, `<strong>${user} said:</strong> ${message}`, 'JAM');
                ComfyJS.Say(`Hey, @${user}! Be sure to tell Bryan what sort of music you want! Choose from these: ${stationsString}`)
                render();
                break;
            case "778065cd-9ece-4927-9d8a-6418d87f49a5":
                composeScreen(user, `${user} fed me and wants me to tell EVERYONE a message!`, `<strong>${user} said:</strong> ${message}`, 'pixelSays', false);
                pixelSpeaks(message);
                console.log('run through pixel message');
                render();
                break;
            case "8d6b3c92-2445-4137-9f22-b318333ea260":
                composeScreen(user, `${user} fed me and wants a CSS FUN FACT!`, `<strong>${user} said:</strong> ${message}`, 'funFact', true);
                render();
                break;

            default:
                break;
        }
    }
}

ComfyJS.Init( process.env.TWITCHUSER, process.env.OAUTH);





async function getTwitchContent()  {

    // TODO: Abstract out client id?
    const url = `https://api.twitch.tv/helix/streams?user_login=${process.env.TWITCHUSER}`
    const request = new Request(url, {method: 'GET', headers: {'Client-ID': process.env.TWITCH_KEY} });
    console.log(request);
    const response = await fetch(request);
    const json = await response.json();
    console.log(json)
    if (json.data) renderTitle(json.data[0])

}

const data = getTwitchContent();
console.log(data.title);


function renderTitle(data) {
    const titleElement = document.querySelector('#svgTitle');
    console.dir(titleElement);
    titleElement.innerHTML = data.title
}

function pixelSpeaks(words) {
    console.log(words);
    var utter = new SpeechSynthesisUtterance();
	utter.rate = 1.0;
    utter.pitch = 1.8;
    utter.volume = 0.2;
	utter.text = words;

    window.speechSynthesis.speak(utter);   
}


