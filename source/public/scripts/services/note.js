class Note {
    constructor(id, creationDate, duedate, title, description, importance) {
        this.id = id;
        this.creationDate = this.creationDate || new Date();
        this.duedate = this.duedate || new Date();
        this.title = title || "";
        this.description = this.description || "";
        this.importance = this.importance || 0;
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