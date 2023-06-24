/* eslint-disable no-debugger */
import { httpService } from './http-service.js'

export class NoteRESTService {
    
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
        debugger;
        return httpService.ajax("DELETE", `/notes/${id}`, undefined);
    } 
}

export const noteRESTService = new NoteRESTService();
