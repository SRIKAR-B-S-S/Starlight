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
            timestamp.textContent = `lastEdited ${prevStamp}`;  //saves the timestamp to localStorage(with time and date separated by a '-')
        }
}

if (content) { //saves the content as the user types
    content.addEventListener('input', () => {
    localStorage.setItem('starlight_log', content.value); //saves the notes to localStorage
    localStorage.setItem('lastEdited', `${time} - ${date}`); //saves the timestamp to localStorage(with time and date separated by a '-')
    });
}

window.addEventListener('keydown', (e) => { //Added some hotkeys below! For the ease of using Starlight for people who don't use their mouse much

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