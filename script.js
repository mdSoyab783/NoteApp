displayNotes();

function popup() {
    const popupContainer = document.createElement("div");
    popupContainer.id = "popupContainer";
    popupContainer.className = "popupContainer";

    popupContainer.innerHTML = `
    <div class="popup">
        <h1>New Note</h1>
        <textarea id="note-text" class="note-text" placeholder="Enter your Note..."></textarea>
        <div class="btn-container">
            <button class="submitBtn" onclick="createNote()">Create Note</button>
            <button class="cancelBtn" onclick="cancelPopup()">Cancel</button>
        </div>
    </div>
  `;
  document.body.appendChild(popupContainer);
}

function cancelPopup() {
    const popupContainer = document.getElementById("popupContainer");
    if (popupContainer) {
        popupContainer.remove();
    }
}

function createNote() {
    const noteText = document.getElementById('note-text').value;

    if (noteText.trim() !== '') {
        const note = {
            id: new Date().getTime(),
            text: noteText
        };
        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
        existingNotes.push(note);
        localStorage.setItem('notes', JSON.stringify(existingNotes));
        
        cancelPopup(); 
        displayNotes();
    }
}

function displayNotes() {
    const noteList = document.getElementById('notes-list');
    noteList.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('notes')) || []; 
    
    notes.reverse();

    notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${note.text}</span>
            <div class="noteBtns-container">
                <button class="editBtn" onclick="editNote(${note.id})">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="deleteBtn" onclick="deleteNote(${note.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>  
            </div>
        `;
        noteList.appendChild(listItem); 
    });
}

function editNote(noteId) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToEdit = notes.find(note => note.id == noteId); 

    const noteText = noteToEdit ? noteToEdit.text : '';
    const editingPopup = document.createElement("div");
    editingPopup.className = "editing-container-wrapper"; 

    editingPopup.innerHTML = `
      <div id="editing-container" class="popup" data-note-id="${noteId}">
        <h1>Edit Note</h1>
        <textarea id="note-text-edit">${noteText}</textarea>
        <div class="btn-container">
          <button class="submitBtn" onclick="updateNote(${noteId})">Done</button> 
          <button class="cancelBtn" onclick="closeEditPopup()">Cancel</button>
        </div>
      </div>
    `;
    document.body.appendChild(editingPopup);
}

function closeEditPopup() {
    const editingPopup = document.getElementById("editing-container").closest('.editing-container-wrapper');
    if (editingPopup) {
        editingPopup.remove();
    }
}

function updateNote(noteId) {
    const noteText = document.getElementById('note-text-edit').value.trim(); 

    if (noteText !== '') {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        const updatedNotes = notes.map(note => {
            if (note.id == noteId) { 
                return { id: note.id, text: noteText };
            }
            return note;
        });

        localStorage.setItem('notes', JSON.stringify(updatedNotes));

        closeEditPopup();

        displayNotes();
    }
}

function deleteNote(noteId) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes = notes.filter(note => note.id !== noteId); 

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}