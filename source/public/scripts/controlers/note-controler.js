/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-template */
/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable spaced-comment */
import {noteService} from '../services/note-service.js';

class NoteController {
    constructor() {
        //list
        this.noteTemplateCompiled = Handlebars.compile(document.getElementById('note-list-template').innerHTML);
        this.noteContainer = document.getElementById("note-list");
        this.noteContainer.addEventListener('click', (event) => {
            debugger;
            if (event.target.id === "note-edit-button"){
                const noteId = Number(event.target.dataset.noteId);
                const note = noteService.getNoteById(noteId);
                document.getElementById("note-edit-title").innerHTML = "Note Edit";
                let actionElement = document.getElementById("note-action");
                const action =  actionElement.getAttribute("data-action") ;
                actionElement.setAttribute("data-action" , "updateNote") ;
                actionElement.innerHTML = "Update";
                document.getElementById("data-note-id-view").innerHTML = note.id;
                document.getElementById("data-note-id").value = note.id;
                document.getElementById("data-note-title").value = note.title;
                document.getElementById("data-note-description").value = note.description;
                document.getElementById("data-note-importance").value = note.importance;
                document.getElementById("data-note-duedate").value = noteService.format(note.dueDate);
                document.getElementById("data-note-creation-date").innerHTML = noteService.format(note.creationDate);
                document.getElementById("data-note-creation-date-hidden").value = noteService.format(note.creationDate);
                document.getElementById("data-note-isdone").value  = note.isDone;
            //sort and filter
            } else if (event.target.id === "id-sort-ASC"){
                debugger;
                //sort accordingly
            }
          
            debugger;
            }
            );
    
        

        //update / create note
        this.noteForm = document.getElementById("note-form");
        this.noteForm.addEventListener('submit', (event) => {
        
        const noteAction = document.activeElement.dataset.action;
        const data = new FormData(event.target);
        const json = Object.fromEntries(data.entries());
        
        if (noteAction === "updateNote"){
            debugger;
            noteService.loadData();
            const id = json.id;
            const title = json.title;
            const description = json.description;
            const importance = Number(json.importance);
            const dueDate = json.duedate;
            const isDone = json.isdone;
            noteService.editNote(id, title, description, importance, this.formatDateCHISO(dueDate), isDone);
        } if (noteAction === "addNote"){
            debugger; 
            noteService.loadData();
            const title = json.title;
            const description = json.description;
            const importance = Number(json.importance);
            const dueDate = json.duedate;
            const isDone = json.isdone;
            noteService.addNote(title, description, importance, this.formatDateCHISO(dueDate), isDone);
        } else {
            //somethin went wrong
        }
        //reset view
        document.getElementById("note-edit-title").innerHTML = "Note Create";
        this.renderView();
        });
        
    }

    // eslint-disable-next-line class-methods-use-this
    formatDateCHISO(swissDateStr){
        let day = swissDateStr.slice(0,2);
        let month = swissDateStr.slice(3, 5);
        let year = swissDateStr.slice(6, 10);
        return new Date(year + "-" + month + "-" + day);
    }
    
    showNotes() {
        this.noteContainer.innerHTML = this.noteTemplateCompiled(
            {notes: noteService.notes},
            {allowProtoPropertiesByDefault: true});
    }

    renderView() {
        noteService.loadData();
        this.showNotes();
    }

    initialize() {
        noteService.loadData();
        this.renderView(); 
    }
}

// singleton 
new NoteController().initialize();