export default class Note {
    constructor(id, creationDate, duedate, title, description, importance) {
        this.id = id;
        this.creationDate = creationDate || new Date();
        this.duedate = duedate || new Date() ;
        this.title = title || "" ;
        this.description = description || "";
        this.importance = importance || 0;
    }

    toJSON() {
        return {
            id: this.id,
            creationDate: this.creationDate,
            duedate: this.duedate,
            title: this.title,
            description: this.description,
            importance: this.importance
        };
    }
}

