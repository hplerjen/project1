export default class Navigation {

static toggleViewModeToEdit(flag = false){
    const editNoteForm = document.getElementById("note-edit");
    editNoteForm.hidden = !flag;
    const createNoteButton = document.getElementById("note-create-button");
    createNoteButton.hidden = flag;
    const showNoteList = document.getElementById("note-list");
    showNoteList.hidden = flag;
    const showNoteListButton = document.getElementById("note-list-button");
    showNoteListButton.hidden = !flag;
};
}

export const navigation = new Navigation();