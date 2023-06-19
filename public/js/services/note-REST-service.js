import { httpService } from './http-service.js'

class NoteRESTService {
    
    async getNotes() {
        return httpService.ajax("GET", "/notes/", undefined);
    }

    async createNote(note) {
        return httpService.ajax("POST", "/notes/", { note }); 
    }

    async readNote(id) {
        return httpService.ajax("GET", `/notes/${id}`, undefined);
    }

    async updateNote(id, note) {
        return httpService.ajax("PUT", `/notes/${id}`, { note });
    }

    async deleteNote(id) {
        return httpService.ajax("DELETE", `/notes/${id}`, undefined);
    }
}

// eslint-disable-next-line import/prefer-default-export
export const noteRESTService = new NoteRESTService();
