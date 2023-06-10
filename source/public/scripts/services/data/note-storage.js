/* eslint-disable no-debugger */
// eslint-disable-next-line import/prefer-default-export
export class NoteStorage {
    constructor() {
        const notes = JSON.parse(localStorage.getItem('noteStorage_v1') || "[ ]");
        this.notes = notes;
        debugger;
        localStorage.setItem('noteStorage_v1', JSON.stringify(notes));
    }

    getAll() {
        const notes = JSON.parse(localStorage.getItem('noteStorage_v1') || "[ ]");
        this.notes = notes;
        debugger; 
        return this.notes;
    }

    saveAll(notes) {
        this.notes = notes;
        localStorage.setItem('noteStorage_v1', JSON.stringify(notes));
        return this.notes;
    }
}