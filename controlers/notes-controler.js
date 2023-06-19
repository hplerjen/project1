import {noteDBStore} from '../services/note-db-storage.js'

export class NotesControler {

    getNotes = async (req, res) => {
        res.json((await noteDBStore.all() || []))
    };

    createNote = async (req, res) => {
        res.json(await noteDBStore.create(req.body.note));
    };

    readNote = async (req, res) => {
        res.json(await noteDBStore.read(req.params.id));
    };

    updateNote = async (req, res) => {
        res.json(await noteDBStore.update(req.params.id, req.body.note));
    };

    deleteOrder = async (req, res) => {
        res.json(await noteDBStore.delete(req.params.id));
    };

}

export const notesControler = new NotesControler();