/* eslint-disable no-param-reassign */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import {noteRESTService}  from '../services/note-REST-service.js';
import {listSortFilterUtility} from '../utils/list-sort-filter-utility.js' 
import Navigation from '../utils/navigation.js' 

export default class IndexControler {
    constructor() { 
        this.handleTopNavigation();
        this.handleList();      
        this.handleEditForm();       
    }

    initialize() {
        this.renderView(); 
    }

    renderView() {
        this.handleSortFilter();
    }

    handleTopNavigation(){
        const createNoteButton = document.getElementById("note-create-button");
        createNoteButton.addEventListener("click", () => {
            Navigation.toggleViewModeToEdit(true);
            this.initializeEditForm();
  
        });
        const showNoteListButton = document.getElementById("note-list-button");
        showNoteListButton.addEventListener("click", () => {
            Navigation.toggleViewModeToEdit();
        });
    }

    initializeEditForm(){
        document.getElementById("note-edit-title").innerHTML = "Note Create";
        const actionElement = document.getElementById("note-action");
        actionElement.setAttribute("data-action" , "createNote") ;
        actionElement.innerHTML = "Create";
        document.getElementById("data-note-id").value = null;
        document.getElementById("data-note-title").value = null;
        document.getElementById("data-note-description").value = null;
        document.getElementById("data-note-importance").value = Number(5);
        document.getElementById("data-note-duedate").value = null;
        document.getElementById("data-note-creationdate").innerHTML = null;
        document.getElementById("data-note-creationdatehidden").value = null;
        document.getElementById("data-note-isdone").checked = false 
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
                await this.handleSortFilter();
            } 
        });
    }
 
    async handleSortFilter(){
        const sorted = await listSortFilterUtility.handleSortFilter();
        this.noteContainer.innerHTML = this.noteTemplateCompiled(
                {notes : sorted},
                {allowProtoPropertiesByDefault: true});
        Navigation.toggleViewModeToEdit(false);
    }

    handleEditForm(){
                this.initializeEditForm();
                this.noteForm = document.getElementById("note-form");
                this.noteForm.addEventListener('submit', async (event) => {
                    event.preventDefault();
                    const noteAction = document.activeElement.dataset.action;
                    const data = new FormData(event.target);
                    const json = Object.fromEntries(data.entries());
                    
                    if (noteAction === "updateNote"){
                        await this.handleUpdate(json);
                        
                    } if (noteAction === "createNote"){  
                        await this.handleCreate(json);
                    } 
                    // reset view
                    this.initializeEditForm();
                    this.renderView();
                });  
    }

    prepareInputForCU(json, isCreate = false){
        const {title} = json;
        const {description} = json;
        const importance = Number(json.importance);
        const creationDate = json.creationdatehidden;
        const dueDate = json.duedate;
        const isDone = Boolean(json.isdone);
        
        const note = {
            title: title, 
            description: description , 
            importance: importance, 
            creationDate: isCreate? new Date(): IndexControler.formatDateCHISO(creationDate),
            dueDate: IndexControler.formatDateCHISO(dueDate),
            isDone: isDone
        };
        return note;
    }

    async handleCreate(json){
        const note = this.prepareInputForCU(json, true);
        await noteRESTService.createNote(note);
    } 

    async handleUpdate(json){
        const {id} = json;
        const note = this.prepareInputForCU(json);
        await noteRESTService.updateNote(id, note); 
    }

    async handleEdit(event){
        const id = event.target.dataset.noteId;
        const note = await noteRESTService.readNote(id);
        document.getElementById("note-edit-title").innerHTML = "Note Edit";
        const actionElement = document.getElementById("note-action");
        actionElement.setAttribute("data-action" , "updateNote") ;
        actionElement.innerHTML = "Update";
        document.getElementById("data-note-id").value = note._id;
        document.getElementById("data-note-title").value = note.title;
        document.getElementById("data-note-description").value = note.description;
        document.getElementById("data-note-importance").value = Number(note.importance);
        document.getElementById("data-note-duedate").value = IndexControler.format(new Date(note.dueDate));
        document.getElementById("data-note-creationdate").innerHTML = IndexControler.format(new Date(note.creationDate));
        document.getElementById("data-note-creationdatehidden").value = IndexControler.format(new Date(note.creationDate));
        const isdone = document.getElementById("data-note-isdone");     
        isdone.checked  = Boolean(note.isDone);
        Navigation.toggleViewModeToEdit(true);
    }
    


    async handleDelete(event){
        const doDelete = confirm("Do you really want to delete this note?");
        if (doDelete) {
            const id = event.target.dataset.noteId;
            await noteRESTService.deleteNote(id);
            alert("Delete Note successfully");
        }
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