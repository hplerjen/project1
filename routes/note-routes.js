import express from 'express';
import {notesControler} from '../controlers/notes-controler.js';

const router = express.Router();
router.get("/", notesControler.getNotes);
router.post("/", notesControler.createNote);
router.get("/:id/", notesControler.readNote);
router.put("/:id/", notesControler.updateNote);
router.delete("/:id/", notesControler.deleteOrder);
// eslint-disable-next-line import/prefer-default-export
export const noteRoutes = router;
