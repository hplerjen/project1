/* eslint-disable no-debugger */
/* eslint-disable import/prefer-default-export */
import express from 'express';
import bodyParser from 'body-parser';
import path, {dirname} from 'path';

import {fileURLToPath} from "url";
import {noteRoutes} from './routes/note-routes.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

export const app = express();

app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public'))); 

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile("/html/index.html", {root: `${__dirname  }/source/public/`});
});

app.use("/notes", noteRoutes);
