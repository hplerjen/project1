// eslint-disable-next-line import/prefer-default-export
export class NoteStorage {
    constructor() {
        const notes = JSON.parse(localStorage.getItem('noteStorage_v1') || "[ ]");
        this.notes = notes;
        localStorage.setItem('noteStorage_v1', JSON.stringify(notes));
    }

    getAll() {
        return this.notes;
    }

    update() {
        localStorage.setItem('noteStorage_v1', JSON.stringify(this.notes));
        return this.notes;
    }
}