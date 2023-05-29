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
    }

    save() {
        this.storage.update(this.notes.map(n => n.toJSON()));
    }
}

export const noteService = new NoteService();