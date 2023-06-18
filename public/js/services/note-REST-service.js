/* eslint-disable no-debugger */
/* eslint-disable object-shorthand */
/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { httpService } from './http-service.js'

class NoteRESTService {
    
    async getNotes() {
        debugger;
        return httpService.ajax("GET", "/notes/", undefined);
    }

    async createNote(note) {
        debugger;
        return httpService.ajax("POST", "/notes/", { note }); 
    }

    async readNote(id) {
        debugger;
        return httpService.ajax("GET", `/notes/${id}`, undefined);
    }

    async updateNote(id, note) {
        return httpService.ajax("PUT", `/notes/${id}`, { note });
    }

    async deleteNote(id) {
        return httpService.ajax("DELETE", `/notes/${id}`, undefined);
    }
}

export const noteRESTService = new NoteRESTService();
