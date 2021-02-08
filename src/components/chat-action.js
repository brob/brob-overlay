const ComfyJS = require("comfy.js");
const {composeScreen, render} = require('./compose-screen')
import metricPush from '../utils/metricPush'

let soapboxes;
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

function pixelSpeaks(words) {
    var utter = new SpeechSynthesisUtterance();
	utter.rate = 1.0;
    utter.pitch = 1.8;
    utter.volume = 0.2;
	utter.text = words;

    window.speechSynthesis.speak(utter);   
}




ComfyJS.onChat = ( user, message, flags, self, extra ) => {
    if (flags.customReward) {
        console.dir(extra.messageEmotes);
        switch (extra.customRewardId) {
            case "9f031da9-695f-44af-964d-127205d267a4":            
                composeScreen(user, `${user} fed me! <br> Give them a rant! <br> Random Topic: <em>${randomRant()}</em>`, `<strong>${user} said:</strong> ${message}`, 'soapbox');
                metricPush('rant', user);
                render();
                break;
            case "10478acd-5368-4b69-a668-2655874b8e2c":
                composeScreen(user, `${user} fed me and wants to change song!`, `<strong>${user} said:</strong> ${message}`, 'JAM');
                ComfyJS.Say(`Hey, @${user}! Be sure to tell Bryan what sort of music you want! Choose from these: ${stationsString}`)
                metricPush('music', user);
                render();
                break;
            case "778065cd-9ece-4927-9d8a-6418d87f49a5":
                composeScreen(user, `${user} fed me and wants me to tell EVERYONE a message!`, `<strong>${user} said:</strong> ${message}`, 'pixelSays', false);
                pixelSpeaks(message);
                console.log('run through pixel message');
                metricPush('speak', user);
                render();
                break;
            case "8d6b3c92-2445-4137-9f22-b318333ea260":
                composeScreen(user, `${user} fed me and wants a CSS FUN FACT!`, `<strong>${user} said:</strong> ${message}`, 'funFact', true);
                metricPush('CSS Fun Fact', user);
                render();
                break;

            default:
                break;
        }
    }
}



module.exports = function init(rants) {
    soapboxes = rants;
    ComfyJS.Init( process.env.TWITCHUSER, process.env.OAUTH);
}