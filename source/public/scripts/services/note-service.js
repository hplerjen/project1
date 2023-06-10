/* eslint-disable no-debugger */
/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-template */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import {NoteStorage} from './data/note-storage.js';
import {Note} from './note.js';

export class NoteService {
    constructor(storage) {
        this.storage = storage || new NoteStorage();
        this.notes = [ ];
        this.filterOn = false;
        this.notesView = [ ];
        this.latestId = 0;
        this.#loadData();
    }

    #loadData() {
        this.notes = this.storage.getAll().map(n => new Note(
                n.id,
                n.title, 
                n.description, 
                n.importance,
                n.creationDate,
                n.dueDate,
                n.isDone )
            
        );
        if (this.notes.length === 0) { // initial data feed
            this.addNote(
                    "Book of Brama NEW" , 
                    "Purchase at amazon",
                    2,
                    new Date("1967-03-01"), 
                    new Date("2023-06-23") ,
                    Boolean(false));
            this.addNote(
                        "Time to relax" , 
                        "Rheinfelden SPA",
                        5,
                        new Date("1967-08-08"), 
                        new Date("2023-06-25") ,
                        Boolean(true));
        }
        this.sortIdASC();
        this.applyFilterOnView();
    }

    save() {
        this.storage.saveAll(this.notes); 
    }

    addNote(title, description, importance, creationDate, dueDate, isDone){
        let note = new Note(
            this.createId(), 
            title, description, 
            importance, 
            creationDate, dueDate, 
            isDone);
        this.notes.push(note);
        this.sortIdASC();
        this.save();
        this.applyFilterOnView();
    }
    
    applyFilterOnView(){
        if (this.filterOn === true){
            this.notesView = this.notes.filter(note => note.isDone === false);
        } else {
            this.notesView = this.notes;
        }
    };

    editNote(id, title, description, importance, creationDate, dueDate, isDone){
        const note = this.getNoteById(id);
        note.title = title  ;
        note.description = description;
        note.importance = importance;
        note.creationDate = creationDate;
        note.dueDate = dueDate;
        note.isDone = isDone;
        this.save();
        this.applyFilterOnView();
    } 

    getNoteById(id){
        return this.notes.find(n => n.id === id); 
    }

    createId(){
        debugger;
        if (this.notes.length > 1){
            this.sortIdDESC();
            if (this.notes[0].id !== undefined){
                this.latestId = this.notes[0].id;
            } else {
                this.latestId = 1;
            }
        }
        this.latestId += 1; 
        return this.latestId;
    }


    format(date){
        let day = date.getDate();
        if (day < 10) {day = "0" + day;}
        let month = date.getMonth() + 1;
        if (month < 10) {month = "0" + month;}
        const year = date.getFullYear();
        let resultString = day + '.' + month + '.' + year
        return resultString;
    } 

    formatDateCHISO(swissDateStr){
        debugger;
        let day = swissDateStr.slice(0,2);
        let month = swissDateStr.slice(3, 5);
        let year = swissDateStr.slice(6, 10);
        const date = new Date(year + "-" + month + "-" + day);
        return date;
    }

    sortIdASC(){
        this.notes = this.notes.sort((a, b)=> a.id - b.id);
    }

    sortIdDESC(){
        this.notes = this.notes.sort((a, b)=> b.id - a.id);
    }

    sortTitleASC(){
        this.notes = this.notes.sort((a, b)=>  {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          });
    }

    sortTitleDESC(){
        this.notes = this.notes.sort((a, b)=>  {
            if (a.title > b.title) {
              return -1;
            }
            if (a.title < b.title) {
              return 1;
            }
            return 0;
          });
    }

    sortDescriptionASC(){
        this.notes = this.notes.sort((a, b)=>  {
            if (a.description < b.description) {
              return -1;
            }
            if (a.description > b.description) {
              return 1;
            }
            return 0;
          });
    }

    sortDescriptionDESC(){
        this.notes = this.notes.sort((a, b)=>  {
            if (a.description > b.description) {
              return -1;
            }
            if (a.description < b.description) {
              return 1;
            }
            return 0;
          });
    }

    sortImportanceASC(){
        this.notes = this.notes.sort((a, b)=> a.importance - b.importance);
    }

    sortImportanceDESC(){
        this.notes = this.notes.sort((a, b)=> b.importance - a.importance);
    }

    sortDueDateASC(){
        this.notes = this.notes.sort((a, b)=> new Date(a.dueDate) - new Date(b.dueDate));
    }

    sortDueDateDESC(){
        this.notes = this.notes.sort((a, b)=> new Date(b.dueDate) - new Date(a.dueDate));
    }

    sortCreationDateASC(){
        this.notes = this.notes.sort((a, b)=> new Date(a.creationDate) - new Date(b.creationDate));
    }

    sortCreationDateDESC(){
        this.notes = this.notes.sort((a, b)=> new Date(b.creationDate) - new Date(a.creationDate));
    }


}


/*function getNote(orderBy, filterBy){
     sort & filter
}*/

    //getNote(orderBy, filterBy) // Notes aus dem Storage abrufen
    //addNote(note) // neue Note in den Storage einfügen
    //updateNote(note) // Note im Storage aktualiseren
    //getNoteById(id)  // Gezielt ein Note aus dem Storage abrufen






export const noteService = new NoteService();