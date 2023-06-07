/* eslint-disable prefer-template */
/* eslint-disable import/prefer-default-export */
export class Note {
    constructor(id, title, description, importance, creationDate, dueDate, isDone ) {
        this.id = id;
        this.title = title || "" ;
        this.description = description || "";
        this.importance = importance || 0;
        this.creationDate = creationDate || new Date();
        this.dueDate = dueDate || new Date() ;
        this.isDone = isDone || false;
    }

    toJSON() {
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
