import {noteService} from '../services/note-service.js';

class NoteController {
    constructor() {
        this.noteTemplateCompiled = Handlebars.compile(document.getElementById('note-list-template').innerHTML);
    }

    showNotes() {
        this.noteContainer.innerHTML = this.noteTemplateCompiled(
            {notes: noteService.notes},
            {allowProtoPropertiesByDefault: true}
        )
    }

    renderView() {
        this.showNotes();
    }

    initialize() {
        noteService.loadData();
        this.renderView();
    }
}

// create one-and-only instance
new NoteController().initialize();