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
        this.latestId = 0;
    }

    loadData() {
        this.notes = this.storage.getAll().map(n => new Note(
                n.id,
                n.title, 
                n.description, 
                n.importance,
                n.creationDate,
                n.duedate)
            
        );
        if (this.notes.length === 0) { // initial data feed
            this.addNote(
                "Mary's Birthday" , 
                "Get her a present" , 
                4,
                new Date("2022-03-25"), 
                new Date("2023-06-25") );
            this.addNote(
                    "Book of Brama" , 
                    "Purchase at amazon",
                    2,
                    new Date("2022-03-01"), 
                    new Date("2023-06-23") );
            this.save();
        }
    }

    save() {
        const jsonArray = this.notes.map(n => n.toJSON);
        this.storage.saveAll(jsonArray); 
    }

    addNote(title, description, importance, dueDate, isDone){
        let isDoneFlag = false; 
        if (isDone === false) {
            isDoneFlag = false;
        }
        else if (typeof isDone !==  "undefined") {
            isDoneFlag = true;
        }
        this.notes.push(new Note(
            this.createId(), title, description, importance, new Date(), dueDate, isDoneFlag));
        this.notes.sort();
    }

    editNote(id, title, description, importance, dueDate, isDone){
        debugger;
        const note = this.getNoteById(id);
        if (title != null) {  note.title = title } ;
        if (description != null) {  note.description = description } ;
        if (importance != null) {  note.importance = importance } ;
        if (dueDate != null) {  note.dueDate = dueDate } ;
        if (isDone) { note.isDone = isDone};
    } 

    getNoteById(id){
        return this.notes.find(n => n.id === id); 
    }

    createId(){
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

}


/*function getNote(orderBy, filterBy){
     sort & filter
}*/

    // getNote(orderBy, filterBy) // Notes aus dem Storage abrufen
    //addNote(note) // neue Note in den Storage einfügen
    //updateNote(note) // Note im Storage aktualiseren
    //getNoteById(id)  // Gezielt ein Note aus dem Storage abrufen






export const noteService = new NoteService();