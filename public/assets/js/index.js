// Variables to hold references to DOM elements
let noteForm;
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let clearBtn;
let noteList;

// Check if the current page is "notes"
if (window.location.pathname === "/notes") {
  // Select elements from the DOM
  noteForm = document.querySelector(".note-form");
  noteTitle = document.querySelector(".note-title");
  noteText = document.querySelector(".note-textarea");
  saveNoteBtn = document.querySelector(".save-note");
  newNoteBtn = document.querySelector(".new-note");
  clearBtn = document.querySelector(".clear-btn");
  noteList = document.querySelectorAll(".list-container .list-group");
}

// Function to show an element
const show = (elem) => {
  elem.style.display = "inline";
};

// Function to hide an element
const hide = (elem) => {
  elem.style.display = "none";
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// Function to get notes from the server
const getNotes = () =>
  fetch("/api/notes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

// Function to save a note to the server
const saveNote = (note) =>
  fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

// Function to delete a note from the server
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

// Function to render the active note
const renderActiveNote = () => {
  hide(saveNoteBtn); // Hide the save button
  hide(clearBtn); // Hide the clear button

  if (activeNote.id) {
    show(newNoteBtn); // Show the new note button
    noteTitle.setAttribute("readonly", true); // Make the title readonly
    noteText.setAttribute("readonly", true); // Make the text readonly
    noteTitle.value = activeNote.title; // Set the title value
    noteText.value = activeNote.text; // Set the text value
  } else {
    hide(newNoteBtn); // Hide the new note button
    noteTitle.removeAttribute("readonly"); // Make the title editable
    noteText.removeAttribute("readonly"); // Make the text editable
    noteTitle.value = ""; // Clear the title
    noteText.value = ""; // Clear the text
  }
};

// Function to handle saving a note
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value, // Get the title value
    text: noteText.value, // Get the text value
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes(); // Refresh the note list
    renderActiveNote(); // Render the active note
  });
};

// Function to handle deleting a note
const handleNoteDelete = (e) => {
  e.stopPropagation(); // Prevents the click listener for the list from being called when the button inside of it is clicked

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute("data-note")).id; // Get the note ID

  if (activeNote.id === noteId) {
    activeNote = {}; // Clear the active note if it matches the deleted note
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes(); // Refresh the note list
    renderActiveNote(); // Render the active note
  });
};

// Function to handle viewing a note
const handleNoteView = (e) => {
  e.preventDefault(); // Prevent default behavior
  activeNote = JSON.parse(e.target.parentElement.getAttribute("data-note")); // Set the active note
  renderActiveNote(); // Render the active note
};

// Function to handle creating a new note
const handleNewNoteView = () => {
  activeNote = {}; // Clear the active note
  show(clearBtn); // Show the clear button
  renderActiveNote(); // Render the active note
};

// Function to render the appropriate buttons based on the state of the form
const handleRenderBtns = () => {
  show(clearBtn); // Show the clear button
  if (!noteTitle.value.trim() && !noteText.value.trim()) {
    hide(clearBtn); // Hide the clear button if both title and text are empty
  } else if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn); // Hide the save button if either title or text is empty
  } else {
    show(saveNoteBtn); // Show the save button if both title and text are filled
  }
};

// Function to render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === "/notes") {
    noteList.forEach((el) => (el.innerHTML = "")); // Clear the note list
  }

  let noteListItems = [];

  // Function to create a list item element
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement("li");
    liEl.classList.add("list-group-item");

    const spanEl = document.createElement("span");
    spanEl.classList.add("list-item-title");
    spanEl.innerText = text;
    spanEl.addEventListener("click", handleNoteView); // Add event listener for viewing a note

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement("i");
      delBtnEl.classList.add(
        "fas",
        "fa-trash-alt",
        "float-right",
        "text-danger",
        "delete-note"
      );
      delBtnEl.addEventListener("click", handleNoteDelete); // Add event listener for deleting a note

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi("No saved Notes", false)); // Show message if there are no saved notes
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title); // Create list item for each note
    li.dataset.note = JSON.stringify(note); // Attach note data to the list item

    noteListItems.push(li);
  });

  if (window.location.pathname === "/notes") {
    noteListItems.forEach((note) => noteList[0].append(note)); // Append the list items to the note list
  }
};

// Function to get notes from the database and render them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === "/notes") {
  saveNoteBtn.addEventListener("click", handleNoteSave); // Add event listener for saving a note
  newNoteBtn.addEventListener("click", handleNewNoteView); // Add event listener for creating a new note
  clearBtn.addEventListener("click", renderActiveNote); // Add event listener for clearing the form
  noteForm.addEventListener("input", handleRenderBtns); // Add event listener for form input
}

getAndRenderNotes(); // Initial call to get and render notes
