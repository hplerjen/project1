import {noteRESTService}  from '../services/note-REST-service.js';

export default class ListSortFilterUtility {

    constructor () {
        this.notesView = [];
    }

    async handleSortFilter(){
        // FIXME wrong approach
        const {sort} = document.activeElement.dataset;
        const {field} = document.activeElement.dataset;
        
        // load note list from service
        const notes = await noteRESTService.getNotes();
        this.notesView = [...notes];
    
        if (field === "isDone" && sort === "FILTER-ON"){
            this.notesView = this.notesView.filter(note => note.isDone === false);
        } else if (field === "isDone" && sort === "FILTER-OFF"){
            this.notesView = notes;
        } else if (field === "title" ){
            this.sortCriteriaString(field, sort);
        } else if (field === "description" ){
            this.sortCriteriaString(field, sort);
        } else if (field === "importance" ){
            this.sortCriteriaNumber(field, sort);
        } else if (field === "creationDate" ){
            this.sortCriteriaDate(field, sort);
        } else if (field === "dueDate"){
            this.sortCriteriaDate(field, sort);
        } else {
            // default sort
           this.sortCriteriaDate("dueDate", "DESC");
        }

        return this.notesView;
    }

    sortCriteriaString(param, direction) {
        direction === "ASC"? 
        this.notesView.sort((a, b) => {
                if (a[param] < b[param]) { return -1; }
                if (a[param] > b[param]) { return 1;  }
                return 0;
        })
        : this.notesView.sort((a, b) => {
            if (a[param] > b[param]) { return -1;}
            if (a[param] < b[param]) { return 1;}
            return 0;
        });
    };

    sortCriteriaNumber(param, direction) {
        direction === "ASC"? 
        this.notesView.sort((a, b) => { 
           return Number(a[param]) - Number (b[param]);
        })
        : this.notesView.sort((a, b) => { 
            return Number (b[param]) - Number (a[param]);
        })
    };

    sortCriteriaDate(param, direction) {
        if (direction === "ASC"){
            this.notesView.sort((a, b) =>  {  
                return new Date(a[param]) - new Date(b[param])});  
        } else {
            this.notesView.sort((a, b) => {  
            return new Date(b[param]) - new Date(a[param])}); 
    };
    
}
}

export const listSortFilterUtility = new ListSortFilterUtility();