const content = document.getElementById('notes');
const timestamp = document.getElementById('time-stamp');

const savedNotes = localStorage.getItem('starlight_log'); //loads the previously saved content
if (savedNotes !== null) {
    content.value = savedNotes;
}

const now = new Date();
const time = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}); //gets time in the format of MM:HH AM/PM
const date = now.toLocaleDateString([], {day: '2-digit'}) + '/' + now.toLocaleDateString([], {month: '2-digit'}); //gets date in the format of DD/MM

const lastEdited = localStorage.getItem('lastEdited');
if (lastEdited !== null) { // loads the recent timestamp
    setTimeStamp();
} else {
    timestamp.textContent = 'Last edited: *looks like its ur first time*';
}

function setTimeStamp() { //will set the timestamp of when the notes was edited previously. Added a function for it unlike my previous approach because I now want to display the date in the timestamp only if the notes was last edited on the previous day
    const prevStamp = localStorage.getItem('lastEdited'); //fetches the previous timestamp
    const formatPrevDate = prevStamp.replaceAll(' ', '').split("-")[1]; //formats the timestamp only to get the date part, such as "08/10"
    const formatPrevTime = prevStamp.replaceAll(' ', '').split("-")[0].replace('PM', ' PM' || 'AM', ' AM'); //formats the previous timestamp only to obtain the time. As we removed the spaces, we are again adding the spaces before AM/PM
        if (date === formatPrevDate) { // checks if the current date is same as the date on the last edited timestamp
           timestamp.textContent = `Last edited: ${formatPrevTime}`; //if yes, it will display only the time..
        }
        else if (date !== formatPrevDate) { //if no, then it will display both date and time because the last edited day is not today, so you have to know the date.
            timestamp.textContent = `Last edited: ${prevStamp}`;  //saves the timestamp to localStorage(with time and date separated by a '-')
        }
}

if (content) { //saves the content as the user types
    content.addEventListener('input', () => {
    localStorage.setItem('starlight_log', content.value); //saves the notes to localStorage
    localStorage.setItem('lastEdited', `${time} - ${date}`); //saves the timestamp to localStorage(with time and date separated by a '-')
    });
}

const savedDialog = document.getElementById('saved-dialog');

window.addEventListener('keydown', (e) => { //Added some hotkeys below! For the ease of using Starlight for people who don't use their mouse much

    if (e.ctrlKey && e.key === 's' )  { // Added a listener for 'Ctrl + S' to take care the reflexes of many people, take me for example, I always use it right after completing every sentence!
        e.preventDefault();
        savedDialog.classList.add('show');
        setTimeout(() => {
            savedDialog.classList.remove('show');
        }, 500);
        
    }

    if (e.key.toLowerCase() === 's') { //S was choosen as it is the initial letter of Starlight
        if (content !== document.activeElement) { //when S is pressed, the textarea gets the focus and the user can immediately start typing
            content.focus();
            e.preventDefault(); //without this, 's' will get typed in the notes
        }
    }

    if (e.key === 'Escape') { //when the Esc key is pressed the text area goes out of focus, if the user thinks that he may have some accidental keyboard presses or if he's afk he can press Esc
        content.blur();
    }
});
// By default the horro sound is paused and when the user presses on the haloween pumpkin, the horror sound will start
const pumpkin = document.getElementById('pumpkin');
let Isplaying = false;
const horrorSound = new Audio('./assets/horror-sound.mp3');
horrorSound.loop = true;

function toggleAudio() { //this function is triggered when teh user presses on the pumpkin image
    if (Isplaying) { //if the audio is already playing then it will stop
        Isplaying = false;
        pumpkin.classList.remove('playing');
        pumpkin.classList.add('paused');
        horrorSound.pause();
    } 
    else {  //if the audio is paused, then it will play
        Isplaying = true;
        pumpkin.classList.remove('paused');
        pumpkin.classList.add('playing');
        horrorSound.play();
    }
}

const randomMessages = [ //set of random horrorful messages
    'Is anyone reading this? My notes are being modified!',
    'Wait! Those aren\'t my words!',
    'save-us! Connection lost at 0x0042',
    'Message: Help me! I\'m lost',
    'IMP: Don\'t close this site! (Not to be ignored)',
    'I thought I was the only one using this site...',
    'I wish I had not opened Starlight :(',
    'Pray that I should\'t come in your dreams tonight'
];

const random_messageDiv = document.getElementById('random-horror-msgs');
const random_messageP = document.getElementById('random-message');

function getRandomDelay(minseconds, maxseconds) { //input of min&max seconds, which will then be converted to milliseconds
    const min_ms = minseconds * 1000;
    const max_ms = maxseconds* 1000;
    return Math.floor(Math.random() * (max_ms - min_ms)) + min_ms; //select random delay from the given min and max seconds and then round it off
}

function displayHorrorMsg() { //function which will display one random horror message from the above list of horror message in random intervals of time to the user , to scare him!
    const randomDelay = getRandomDelay(180, 480); // will create the random delay time between 180s and 480s ie. 3min to 8min
    setTimeout(() => {
        random_messageP.textContent = randomMessages[Math.floor(Math.random() * randomMessages.length)]; //select random message from the above list.
        random_messageDiv.classList.add('show');
        setTimeout(() => {
            random_messageDiv.classList.remove('show');
            displayHorrorMsg();
        }, 3000); // will display the horror message for 3s
        
    }, randomDelay);    
}

displayHorrorMsg();

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { // blur the textarea when holding down the Esc key, using the blur class
        if (event.repeat) {
            content.classList.add('blur');
        }
    }
});

window.addEventListener('keyup', (event) => { //whenever there's a keyup, remove the blur
    content.classList.remove('blur');
});

const away_from_starlightMSGS = [ // a set of messages which will be displayed when the user is not active on the Starlight tab
    'Don\'t leave me..',
    'Where did you go?',
    'I\'m still watching you...',
    'You can\'t escape me',
    'I can still haunt you in your dreams',
    'All eyes on you!!'
];

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') { //will display a random msg out of the above ones if the user has shifted to another tab
        document.title = away_from_starlightMSGS[Math.floor(Math.random() * away_from_starlightMSGS.length)]
    }
    else {
        document.title = 'Starlight' //remvoe the msg as soon as the user comes back to Starlight
    }
});

let mode = 'shadow'; //initially, I want charcoal mode so I will set the mode to 'shadow' and then use toggle mode
const title = document.getElementById('title');

function toggleMode() { //will be triggered when the spider web icon is pressed
    if (mode === 'shadow') { //if the mode is shadow, switch to dark
        mode = 'dark';
        document.documentElement.style.setProperty('--topbar-border', 'rgb(149, 149, 149)');
        document.documentElement.style.setProperty('--topbar-bg', '#00000091');
        document.documentElement.style.setProperty('--website-bg', '#151515');
        document.documentElement.style.setProperty('--text-color', '#a1a1a1');
        document.documentElement.style.setProperty('--caret-color', 'rgb(97, 38, 38)');
        title.classList.remove('shadow');
        document.body.style.cursor = 'url(./assets/spider-pointer.png), auto';
        content.style.cursor = 'url(./assets/spider-pointer.png), auto';
    }
    else { //if the mode is dark, switch to shadow
        mode = 'shadow';
        document.documentElement.style.setProperty('--topbar-bg', 'rgb(66, 65, 65)');
        document.documentElement.style.setProperty('--website-bg', 'rgb(100, 100, 100)');
        document.documentElement.style.setProperty('--topbar-border', '#282828');
        document.documentElement.style.setProperty('--text-color', '#efefef');
        document.documentElement.style.setProperty('--caret-color', 'rgb(80, 75, 67)');
        title.classList.add('shadow');
        document.body.style.cursor = 'url(./assets/bat-pointer.png), auto';
        content.style.cursor = 'url(./assets/bat-pointer.png), auto';
    }
}

toggleMode();