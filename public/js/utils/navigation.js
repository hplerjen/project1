export default class Navigation {

static toggleViewModeToEdit(flag = false){
    const editNoteForm = document.getElementById("note-edit");
    editNoteForm.hidden = !flag;
    const showNoteList = document.getElementById("note-list");
    showNoteList.hidden = flag;
};
}

export const navigation = new Navigation();