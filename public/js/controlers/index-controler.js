import {noteRESTService}  from '../services/note-REST-service.js';
import Note from '../services/note.js';
import {listSortFilterUtility} from '../utils/list-sort-filter-utility.js' 

export default class IndexControler {
    constructor() {  
        this.handleList();      
        this.handleEditForm();       
    }

    initialize() {
        this.renderView(); 
    }

    renderView() {
        this.showNotes();
    }

    async showNotes() {
        const notes = await noteRESTService.getNotes();
        this.noteContainer.innerHTML = this.noteTemplateCompiled(
            {notes},
            {allowProtoPropertiesByDefault: true});
    }

    handleList(){
        this.noteTemplateCompiled = 
        Handlebars.compile(document.getElementById('note-list-template').innerHTML);
        this.noteContainer = document.getElementById("note-list");
        this.noteContainer.addEventListener('click', async (event) => {
            if (event.target.id === "note-edit-button"){
                await this.handleEdit(event);
            } else if (event.target.id === "note-delete-button"){
                await this.handleDelete(event);
            }  else {
                await this.handleSortFilter(event);
            } 
        });
    }

    async handleSortFilter(event){
        const sorted = await listSortFilterUtility.handleOrderFilter(event); 
        this.noteContainer.innerHTML = this.noteTemplateCompiled(
                {notes : sorted},
                {allowProtoPropertiesByDefault: true});
    }

    handleEditForm(){
                this.noteForm = document.getElementById("note-form");
                this.noteForm.addEventListener('submit', async (event) => {
                    // event.preventDefault();
                    const noteAction = document.activeElement.dataset.action;
                    const data = new FormData(event.target);
                    const json = Object.fromEntries(data.entries());
                    
                    if (noteAction === "updateNote"){
                        await this.handleUpdate(json);
                        
                    } if (noteAction === "addNote"){  
                        await this.handleCreate(json);
                    } 
                    // reset view
                    document.getElementById("note-edit-title").innerHTML = "Note Create";
                    this.renderView();
                });

    }

    // FIXME currently not used yet
    createNoteFromJSON(id, json, creationDateInput){
        const {title} = json;
        const {description} = json;
        const importance = Number(json.importance);
        const creationDate = creationDateInput;
        const dueDate = json.duedate;
        const isDone = Boolean(json.isdone);
        const note =  new Note(id, title, description, importance, 
            IndexControler.formatDateCHISO(creationDate),
            IndexControler.formatDateCHISO(dueDate), 
            isDone)
        return note;
    }

    // FIXME remove id from logic 
    async createId(){
        let nextId = 1;
        const notes = await noteRESTService.getNotes();
        if (notes.length > 0){
                const sorted = [...notes].sort((a, b)=> a.id - b.id);
                nextId = Number(sorted.pop().id) + 1;
        }
        return nextId;
    }


    async handleCreate(json){
        const {title} = json;
        const {description} = json;
        const importance = Number(json.importance);
        const dueDate = json.duedate;
        const isDone = Boolean(json.isdone);
        await noteRESTService.createNote(
            new Note(
                await this.createId(),
                title, description, importance, 
                new Date(), 
                IndexControler.formatDateCHISO(dueDate), 
                isDone)); 
    } 
    
    async handleUpdate(json){
        const id = Number( json.id );
        const {title} = json;
        const {description} = json;
        const importance = Number(json.importance);
        const creationDate = json.creationdatehidden;
        const dueDate = json.duedate;
        const isDone = Boolean(json.isdone);
        await noteRESTService.updateNote(id, 
            new Note(id, title, description, importance, 
            IndexControler.formatDateCHISO(creationDate),
            IndexControler.formatDateCHISO(dueDate), 
            isDone)); 
    }

    async handleEdit(event){
        const id = Number(event.target.dataset.noteId);
        const note = await noteRESTService.readNote(id);
        document.getElementById("note-edit-title").innerHTML = "Note Edit";
        const actionElement = document.getElementById("note-action");
        actionElement.setAttribute("data-action" , "updateNote") ;
        actionElement.innerHTML = "Update";
        document.getElementById("data-note-id-view").innerHTML = note.id;
        document.getElementById("data-note-id").value = note.id;
        document.getElementById("data-note-title").value = note.title;
        document.getElementById("data-note-description").value = note.description;
        document.getElementById("data-note-importance").value = note.importance;
        document.getElementById("data-note-duedate").value = IndexControler.format(new Date(note.dueDate));
        document.getElementById("data-note-creationdate").innerHTML = IndexControler.format(new Date(note.creationDate));
        document.getElementById("data-note-creationdatehidden").value = IndexControler.format(new Date(note.creationDate));
        const isdone = document.getElementById("data-note-isdone");     
        isdone.checked  = note.isDone;
    }

    async handleDelete(event){
        const id = Number(event.target.dataset.noteId);
        await noteRESTService.deleteNote(id);
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
new IndexControler().initialize();