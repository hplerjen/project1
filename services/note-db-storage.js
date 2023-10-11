import Datastore from 'nedb-promises'
import Note from './note.js'

export class NoteDBStore {
    constructor(db) {
        const options = process.env.DB_TYPE === "FILE" ? {filename: './data/notes.db', autoload: true} : {}
        this.db = db || new Datastore(options);
    }

    async all() {
        // eslint-disable-next-line spaced-comment
        //FIXME filter and sort should happe here
        return this.db.find({}).sort({ id: 1 }).exec();
    }

    async create(noteIn) {
        const note = new Note(
            noteIn.title,
            noteIn.description,
            noteIn.importance,
            noteIn.creationDate,
            noteIn.dueDate,
            noteIn.isDone
        );
        return this.db.insert(note);
    }

    async read(_id) {
        return this.db.findOne({_id: _id});
    }

    async update(_id, note) {
        return this.db.update({_id: _id} , {$set: 
             {"title": note.title, 
              "description": note.description,
              "importance": note.importance,
              "creationDate": note.creationDate,
              "dueDate" : note.dueDate ,
              "isDone" : note.isDone
            }}, {}, () => {} );
    }

    async delete(_id) {
        return this.db.remove({_id: _id}, {}, () => {});
    }

}

export const noteDBStore = new NoteDBStore();