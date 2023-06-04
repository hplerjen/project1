/* eslint-disable no-debugger */
/* eslint-disable spaced-comment */
import {noteService} from '../services/note-service.js';

class NoteController {
    constructor() {
        this.noteTemplateCompiled = Handlebars.compile(document.getElementById('note-list-template').innerHTML);
        this.noteContainer = document.getElementById("note-list");
        this.noteContainer.addEventListener('click', (event) => {
            debugger;
            const noteId = Number(event.target.dataset.noteId);
            const note = noteService.getNoteById(noteId);
            document.getElementById("note-edit-title").innerHTML = "Note Edit";
            document.getElementById("data-note-id").innerHTML = note.id;
            document.getElementById("data-note-title").innerHTML = note.title;
            document.getElementById("data-note-description").innerHTML= note.description;
            document.getElementById("data-note-importance").innerHTML = note.importance;
            document.getElementById("data-note-duedate").innerHTML = note.dueDate.toLocaleDateString('en-US');
            document.getElementById("data-note-creation-date").innerHTML  = note.creationDate.toLocaleDateString('en-US');
        });
        
        this.noteForm = document.getElementById("note-form");
        this.noteForm.addEventListener('submit', (event) => {
        
        //update / create note
        const noteAction = event.target.dataset.action;
        
        if (noteAction === "updateNote" && event.target.dataset.noteid != null){
            debugger;
            const id = event.target.dataset.noteid;
            const title = event.target.dataset.noteTitle;
            const description = event.target.dataset.noteDescription;
            const importance = Number(event.target.dataset.noteImportance);
            const dueDate = event.target.dataset.noteDuedate;
            noteService.updateNote(id, title, description, importance, dueDate);
        } if (noteAction === "addNote"){
            const title = event.target.dataset.noteTitle;
            const description = event.target.dataset.noteDescription;
            const importance = Number(event.target.dataset.noteImportance);
            const dueDate = event.target.dataset.noteDuedate;
            noteService.createNote(title, description, importance, dueDate);
        } else {
            //somethin went wrong
        }

        //reset view
        document.getElementById("note-edit-title").innerHTML = "Note Create";
        this.renderView();
        });
        
    }
    
    showNotes() {
        this.noteContainer.innerHTML = this.noteTemplateCompiled(
            {notes: noteService.notes},
            {allowProtoPropertiesByDefault: true});
    }

    renderView() {
        this.showNotes();
    }

    initialize() {
        noteService.loadData();
        this.renderView(); 
    }

  
}

// singleton 
new NoteController().initialize();