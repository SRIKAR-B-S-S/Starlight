const content = document.getElementById('notes');

const savedNotes = localStorage.getItem('starlight_log'); //loads the previously saved content
if (savedNotes !== null) {
    content.value = savedNotes;
}

if (content) { //saves the content as the user types
    content.addEventListener('input', () => {
    localStorage.setItem('starlight_log', content.value);
    });
}