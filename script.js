const content = document.getElementById('notes');
const timestamp = document.getElementById('time-stamp');

const savedNotes = localStorage.getItem('starlight_log'); //loads the previously saved content
if (savedNotes !== null) {
    content.value = savedNotes;
}

const lastEdited = localStorage.getItem('lastEdited');
if (lastEdited !== null) { // loads the recent timestamp
    timestamp.textContent = `Last edited: ${lastEdited}`;
} else {
    timestamp.textContent = 'Last edited: *looks like its ur first time*';
}

const now = new Date();
const time = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}); //gets time in the format of MM:HH AM/PM
const date = now.toLocaleDateString([], {day: '2-digit'}) + '/' + now.toLocaleDateString([], {month: '2-digit'}); //gets date in the format of DD/MM


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

    if (e.key === 'Escape') { //when the Esc key is pressed the text area goes out of focus, if the user thinks that he may have some accidental keyboard presses or if he's afk he can use it
        content.blur();
    }
});