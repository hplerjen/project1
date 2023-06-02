import {noteService} from '../services/note-service.js';

class NoteController {
    constructor() {
        this.noteTemplateCompiled = Handlebars.compile(document.getElementById('note-list-template').innerHTML);
        this.noteContainer = document.getElementById("note-container");
        debugger;
    }

    // eslint-disable-next-line class-methods-use-this
    showNotes() {
        this.noteContainer.innerHTML = this.noteTemplateCompiled(
            {notes: noteService.notes},
            {allowProtoPropertiesByDefault: true});
        // eslint-disable-next-line no-debugger
        debugger;
    }

    renderView() {
        this.showNotes();
    }

    initialize() {
        noteService.loadData();
        // eslint-disable-next-line no-debugger
        debugger; 
        this.renderView(); 
    }
}

// create one-and-only instance
new NoteController().initialize();