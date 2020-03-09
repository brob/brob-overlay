var ComfyJS = require("comfy.js");

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

function toggleRant(user, message) {
    let audioPlay = document.querySelector('#soapbox audio');
    
    let randomRant = soapboxes[Math.floor(Math.random()*soapboxes.length)];
                
    document.querySelector('#soapbox h1').innerHTML = `${user} wants a rant! <br> Random Topic: <em>${randomRant}</em>`;
    document.querySelector('#soapbox p').innerHTML = `<strong>${user} said:</strong> ${message}`;
    
    
    document.querySelector('#soapbox').classList.add('active');


    audioPlay.volume = 0.2;
    audioPlay.play();


    setTimeout(function() {
        document.querySelector('#soapbox').classList.remove('active');
    }, 5000)

}

function toggleJAM(user, message) {
    let audioPlay = document.querySelector('#JAM audio');
    
    document.querySelector('#JAM h1').innerHTML = `${user} wants to change song!`;
    document.querySelector('#JAM p').innerHTML = `<strong>${user} said:</strong> ${message}`;
    
    document.querySelector('#JAM').classList.add('active');

    ComfyJS.Say(`Hey, @${user}! Be sure to tell Bryan what sort of music you want! Choose from these: ${stationsString}`);


    audioPlay.volume = 0.2;
    audioPlay.play();

    setTimeout(function() {
        document.querySelector('#JAM').classList.remove('active');
    }, 5000)

}





ComfyJS.onChat = ( user, message, flags, self, extra ) => {


    if (flags.customReward) {
        switch (extra.customRewardId) {
            case "9f031da9-695f-44af-964d-127205d267a4":            
                toggleRant(user, message);
                break;
            case "10478acd-5368-4b69-a668-2655874b8e2c":
                toggleJAM(user, message);
            default:
                break;
        }
    }
}

ComfyJS.Init( process.env.TWITCHUSER, process.env.OAUTH);
