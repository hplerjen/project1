export default class NoteStorage {
    constructor() {
        const notes = JSON.parse(localStorage.getItem('noteStorage_v1') || "[ ]");
        this.notes = notes;
        localStorage.setItem('noteStorage_v1', JSON.stringify(notes));
    }

    getAll() {
        const notes = JSON.parse(localStorage.getItem('noteStorage_v1') || "[ ]");
        this.notes = notes;
        return this.notes;
    }

    saveAll(notes) {
        this.notes = notes;
        localStorage.setItem('noteStorage_v1', JSON.stringify(notes));
        return this.notes;
    }
}