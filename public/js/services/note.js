/* eslint-disable no-debugger */
export default class Note {
    constructor(id, title, description, importance, creationDate, dueDate, isDone ) {
        this.id = id;
        this.title = title ;
        this.description = description;
        this.importance = importance;
        this.creationDate = creationDate;
        this.dueDate = dueDate ;
        this.isDone = isDone;
    }

    toJSON() {
        debugger;
        return {

            id: this.id,
            title: this.title,
            description: this.description,
            importance: this.importance,
            creationDate: this.creationDate,
            dueDate: this.dueDate,
            isDone: this.isDone
        };
    } 
};
