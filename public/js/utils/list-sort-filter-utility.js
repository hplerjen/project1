/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import {noteRESTService}  from '../services/note-REST-service.js';

export default class ListSortFilterUtility {

    constructor () {
        this.notesView = [];
    }

    async handleOrderFilter(event){
        const {sort} = document.activeElement.dataset;
        const {field} = document.activeElement.dataset;
        const notes = await noteRESTService.getNotes();
        this.notesView = [...notes];
        if (field === "isDone" && sort === "FILTER-ON"){
            this.notesView = this.notesView.filter(note => note.isDone === false);
        } else if (field === "isDone" && sort === "FILTER-OFF"){
            this.notesView = notes;
        } else if (field === "id"){
            this.sortCriteriaString(field, sort);   
        } else if (field === "title" ){
            this.sortCriteriaString(field, sort);
        } else if (field === "description" ){
            this.sortCriteriaString(field, sort);
        } else if (field === "importance" ){
            this.sortCriteriaSting(field, sort);
        } else if (field === "creationDate" ){
            this.sortCriteriaDate(field, sort);
        } else if (field === "dueDate"){
            this.sortCriteriaDate(field, sort);
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

    // FIXME does not work
    sortCriteriaNumber(param, direction) {
        direction === "ASC"? 
        this.notesView.sort((a, b) => { Number (a[param]) - Number (b[param]) })
        : this.notesView.sort((a, b) => { Number (b[param]) - Number(a[param]) }); 
    };

    // FIXME does not work
    sortCriteriaDate(param, direction) {
        direction === "ASC"? 
        this.notesView.sort((a, b) => { new Date(a[param]) - new Date(b[param]) })
        : this.notesView.sort((a, b) => { new Date(b[param]) - new Date(a[param]) }); 
    };

}

export const listSortFilterUtility = new ListSortFilterUtility();