/* eslint-disable func-names */
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
                debugger;
                document.getElementById("data-note-duedate").value = noteService.format(new Date(note.dueDate));
                document.getElementById("data-note-creationdate").innerHTML = noteService.format(new Date(note.creationDate));
                document.getElementById("data-note-creationdatehidden").value = noteService.format(new Date(note.creationDate));
                debugger;
                const isdone = document.getElementById("data-note-isdone");  
                debugger;      
                isdone.checked  = note.isDone;
        
            //sort and filter
            } else if (event.target.id === "id-sort-ASC"){
                debugger;
                noteService.sortIdASC();
                this.renderView();
            } else if (event.target.id === "id-sort-DESC"){
                debugger;
                noteService.sortIdDESC();
                this.renderView();
            } else if (event.target.id === "title-sort-ASC"){
                debugger;
                noteService.sortTitleASC();
                this.renderView();
            } else if (event.target.id === "title-sort-DESC"){
                debugger;
                noteService.sortTitleDESC();
                this.renderView(); 
            } else if (event.target.id === "desc-sort-ASC"){
                debugger;
                noteService.sortDescriptionASC();
                this.renderView();
            } else if (event.target.id === "desc-sort-DESC"){
                debugger;
                noteService.sortDescriptionDESC();
                this.renderView(); 
            } else if (event.target.id === "imp-sort-ASC"){
                debugger;
                noteService.sortImportanceASC();
                this.renderView();
            } else if (event.target.id === "imp-sort-DESC"){
                debugger;
                noteService.sortImportanceDESC();
                this.renderView();
            } else if (event.target.id === "ddate-sort-ASC"){
                debugger;
                noteService.sortDueDateASC();
                this.renderView();
            } else if (event.target.id === "ddate-sort-DESC"){
                debugger;
                noteService.sortDueDateDESC();
                this.renderView();
            } else if (event.target.id === "cdate-sort-ASC"){
                debugger;
                noteService.sortCreationDateASC();
                this.renderView();
            } else if (event.target.id === "cdate-sort-DESC"){
                debugger;
                noteService.sortCreationDateDESC();
                this.renderView(); 
            }  else if (event.target.id === "status-filter-default"){
                debugger;
                noteService.filterOn = false;
                noteService.applyFilterOnView();
                this.renderView();
            } else if (event.target.id === "status-filter-closed"){
                debugger;
                noteService.filterOn = true;
                noteService.applyFilterOnView();
                this.renderView();
            }
          
            }
            );
    
        

        //update / create note
        this.noteForm = document.getElementById("note-form");
        this.noteForm.addEventListener('submit', (event) => {
        debugger;
        const noteAction = document.activeElement.dataset.action;
        const data = new FormData(event.target);
        const json = Object.fromEntries(data.entries());
        
        if (noteAction === "updateNote"){
            debugger;
            const id = Number( json.id );
            const title = json.title;
            const description = json.description;
            const importance = Number(json.importance);
            const creationDate = json.creationdatehidden;
            const dueDate = json.duedate;
            const isDone = Boolean(json.isdone);
            noteService.editNote(id, title, description, importance, 
                noteService.formatDateCHISO(creationDate),
                noteService.formatDateCHISO(dueDate), isDone);
        } if (noteAction === "addNote"){
            debugger; 
            const title = json.title;
            const description = json.description;
            const importance = Number(json.importance);
            const dueDate = json.duedate;
            const isDone = Boolean(json.isdone);
            noteService.addNote(title, description, importance, 
                new Date(), noteService.formatDateCHISO(dueDate), isDone);
        } else {
            //somethin went wrong
        }
        //reset view
        document.getElementById("note-edit-title").innerHTML = "Note Create";
        this.renderView();
        });
        
    }

    showNotes() {
        debugger;
        this.noteContainer.innerHTML = this.noteTemplateCompiled(
            {notes: noteService.notesView},
            {allowProtoPropertiesByDefault: true});
    }

    renderView() {
        this.showNotes();
    }

    initialize() {
        this.renderView(); 
    }
}

// singleton 
new NoteController().initialize();