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
                n.creationDate.toLocaleDateString('de-CH'),
                n.duedate.toLocaleDateString('de-CH')    
            )
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
                    1,
                    new Date("2022-03-01"), 
                    new Date("2023-06-23") );
            this.save();
        }
    }

    save() {
        const jsonArray = this.notes.map(n => n.toJSON);
        this.storage.update(jsonArray); 
    }

    addNote(title, description, importance, dueDate){
        this.notes.push(new Note(
            this.createId(), title, description, importance, new Date(), dueDate));
        this.notes.sort();
    }

    editNote(id, title, description, importance, dueDate){
        const note = this.notes.find(n => n.id === id);
        if (title != null) {  note.title = title } ;
        if (description != null) {  note.description = description } ;
        if (importance != null) {  note.importance = importance } ;
        if (dueDate != null) {  note.dueDate = dueDate } ;
    } 

    getNoteById(id){
        return this.notes.find(n => n.id === id); 
    }

    createId(){
        this.latestId += 1; 
        return this.latestId;
    }

    

    // getNote(orderBy, filterBy) // Notes aus dem Storage abrufen
    //addNote(note) // neue Note in den Storage einfügen
    //updateNote(note) // Note im Storage aktualiseren
    //getNoteById(id)  // Gezielt ein Note aus dem Storage abrufen
}

/*function getNoteById(id) {
    return this.notes.find((note) => parseInt(id, 10) === parseInt(note.id, 10));
}*/

/*function getNote(orderBy, filterBy){
     sort & filter
}*/

export const noteService = new NoteService();