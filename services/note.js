/* eslint-disable no-debugger */
export default class Note {
    constructor(title, description, importance, creationDate, dueDate, isDone ) {
        this.title = title ;
        this.description = description;
        this.importance = importance;
        this.creationDate = creationDate;
        this.dueDate = dueDate ;
        this.isDone = isDone;
    }
}