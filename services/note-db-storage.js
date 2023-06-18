/* eslint-disable object-shorthand */
/* eslint-disable no-debugger */
/* eslint-disable max-classes-per-file */
import Datastore from 'nedb-promises'

export class Note {
    constructor(id, title, description, importance, creationDate, dueDate, isDone ) {
        this.id = id;
        this.title = title ;
        this.description = description;
        this.importance = importance;
        this.creationDate = creationDate;
        this.dueDate = dueDate ;
        this.isDone = isDone;
    }
}

export class NoteDBStore {
    constructor(db) {
        const options = process.env.DB_TYPE === "FILE" ? {filename: './data/notes.db', autoload: true} : {}
        this.db = db || new Datastore(options);
    }

    async all() {
        return this.db.find({}).sort({ id: -1 }).exec();
    }

    async create(note) {
        return this.db.insert(note);
    }

    async read(_id) {
        return this.db.findOne({id: Number(_id)});
    }

    async update(_id, note) {
        debugger;
        return this.db.update({id: Number(_id)} , {$set: 
             {"title": note.title, 
              "description": note.description,
              "importance": note.importance,
              "creationDate": note.creationDate,
              "dueDate" : note.dueDate ,
              "isDone" : note.isDone
            }}, {}, () => {} );
    }

    async delete(_id) {
        debugger;
        return this.db.remove({ id: Number(_id)}, {}, () => {});
    }

}

export const noteDBStore = new NoteDBStore();