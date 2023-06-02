import {NoteStorage} from './data/note-storage.js';
import {Note} from './note.js';

export class NoteService {
    constructor(storage) {
        this.storage = storage || new NoteStorage();
        this.notes = [ ];
    }

    loadData() {
        this.notes = this.storage.getAll().map(n => new Note(
                n.id,  
                n.creationDate, 
                n.duedate, 
                n.title, 
                n.description, 
                n.importance
            )
        );
        if (this.notes.length === 0) { // initial data seed
            this.notes.push(new Note(1, 
                new Date("2022-03-25"), 
                new Date("2023-06-25"), 
                "Mary's Birthday" , 
                "Get her a present" , 4));
            this.notes.push(new Note(2, 
                    new Date("2022-03-01"), 
                    new Date("2023-06-23"), 
                    "Book of Brama" , 
                    "Purchase at amazon",
                    1));
            this.save();
        }
    }

    save() {
        // eslint-disable-next-line no-debugger
        debugger;
        const jsonArray = this.notes.map(n => n.toJSON);
        this.storage.update(jsonArray); 
    }
}

export const noteService = new NoteService();