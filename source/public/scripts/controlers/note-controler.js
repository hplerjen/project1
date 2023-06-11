import {noteService}  from '../services/note-service.js';

class NoteController {
    constructor() {
        // list
        this.noteTemplateCompiled = Handlebars.compile(document.getElementById('note-list-template').innerHTML);
        this.noteContainer = document.getElementById("note-list");
        this.noteContainer.addEventListener('click', (event) => {
            if (event.target.id === "note-edit-button"){
                const noteId = Number(event.target.dataset.noteId);
                const note = noteService.getNoteById(noteId);
                document.getElementById("note-edit-title").innerHTML = "Note Edit";
                const actionElement = document.getElementById("note-action");
                actionElement.setAttribute("data-action" , "updateNote") ;
                actionElement.innerHTML = "Update";
                document.getElementById("data-note-id-view").innerHTML = note.id;
                document.getElementById("data-note-id").value = note.id;
                document.getElementById("data-note-title").value = note.title;
                document.getElementById("data-note-description").value = note.description;
                document.getElementById("data-note-importance").value = note.importance;
                document.getElementById("data-note-duedate").value = NoteController.format(new Date(note.dueDate));
                document.getElementById("data-note-creationdate").innerHTML = NoteController.format(new Date(note.creationDate));
                document.getElementById("data-note-creationdatehidden").value = NoteController.format(new Date(note.creationDate));
                const isdone = document.getElementById("data-note-isdone");     
                isdone.checked  = note.isDone;
        
            // sort and filter
            } else if (event.target.id === "id-sort-ASC"){
                noteService.sortIdASC();
                this.renderView();
            } else if (event.target.id === "id-sort-DESC"){
                noteService.sortIdDESC();
                this.renderView();
            } else if (event.target.id === "title-sort-ASC"){
                noteService.sortTitleASC();
                this.renderView();
            } else if (event.target.id === "title-sort-DESC"){
                noteService.sortTitleDESC();
                this.renderView(); 
            } else if (event.target.id === "desc-sort-ASC"){
                noteService.sortDescriptionASC();
                this.renderView();
            } else if (event.target.id === "desc-sort-DESC"){
                noteService.sortDescriptionDESC();
                this.renderView(); 
            } else if (event.target.id === "imp-sort-ASC"){
                noteService.sortImportanceASC();
                this.renderView();
            } else if (event.target.id === "imp-sort-DESC"){
                noteService.sortImportanceDESC();
                this.renderView();
            } else if (event.target.id === "ddate-sort-ASC"){
                noteService.sortDueDateASC();
                this.renderView();
            } else if (event.target.id === "ddate-sort-DESC"){
                noteService.sortDueDateDESC();
                this.renderView();
            } else if (event.target.id === "cdate-sort-ASC"){
                noteService.sortCreationDateASC();
                this.renderView();
            } else if (event.target.id === "cdate-sort-DESC"){
                noteService.sortCreationDateDESC();
                this.renderView(); 
            }  else if (event.target.id === "status-filter-default"){
                noteService.filterOn = false;
                noteService.applyFilterOnView();
                this.renderView();
            } else if (event.target.id === "status-filter-closed"){
                noteService.filterOn = true;
                noteService.applyFilterOnView();
                this.renderView();
            }
          
            }
            );
    
        

        // update / create note
        this.noteForm = document.getElementById("note-form");
        this.noteForm.addEventListener('submit', (event) => {
        const noteAction = document.activeElement.dataset.action;
        const data = new FormData(event.target);
        const json = Object.fromEntries(data.entries());
        
        if (noteAction === "updateNote"){
            const id = Number( json.id );
            const {title} = json;
            const {description} = json;
            const importance = Number(json.importance);
            const creationDate = json.creationdatehidden;
            const dueDate = json.duedate;
            const isDone = Boolean(json.isdone);
            noteService.editNote(id, title, description, importance, 
                NoteController.formatDateCHISO(creationDate),
                NoteController.formatDateCHISO(dueDate), isDone);
        } if (noteAction === "addNote"){
            const {title} = json;
            const {description} = json;
            const importance = Number(json.importance);
            const dueDate = json.duedate;
            const isDone = Boolean(json.isdone);
            noteService.addNote(title, description, importance, 
                new Date(), NoteController.formatDateCHISO(dueDate), isDone);
        } else {
            // somethin went wrong
        }
        // reset view
        document.getElementById("note-edit-title").innerHTML = "Note Create";
        this.renderView();
        });
        
    }

    showNotes() {
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

    static format(date){
        let day = date.getDate();
        if (day < 10) {day = `0${  day}`;}
        let month = date.getMonth() + 1;
        if (month < 10) {month = `0${  month}`;}
        const year = date.getFullYear();
        const resultString = `${day  }.${  month  }.${  year}`
        return resultString;
    } 

    static formatDateCHISO(swissDateStr){
        const day = swissDateStr.slice(0,2);
        const month = swissDateStr.slice(3, 5);
        const year = swissDateStr.slice(6, 10);
        const date = new Date(`${year  }-${  month  }-${  day}`);
        return date;
    }
}

// singleton 
new NoteController().initialize();