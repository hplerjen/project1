/* eslint-disable no-console */
import dotenv from "dotenv";

// load config-file
dotenv.config({ path: `.env${process.env.NODE_ENV ? `-${process.env.NODE_ENV}` : ''}`});

// load app with current config
const {app} = await import('./app.js');

const hostname = '127.1.0.1';
const port = process.env.PORT || 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});





/* import express from 'express';
import bodyParser from 'body-parser';
import {noteRoutes} from './source/public/scripts/routes/note-routes.js';
// import {helpers} from './utils/handlebar-util.js'

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(noteRoutes);
app.use(express.static('source/public'));

const hostname = '127.1.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://${hostname}:${port}/`);
}); */

/* import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('source/public'));

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`);
}); */

/* import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {orderRoutes} from './routes/order-routes.js';
import {helpers} from './utils/handlebar-util.js'
import {overrideMiddleware} from "./utils/method-override.js";

// 1. import express-handlebars
import exphbs from 'express-handlebars';


const app = express();

// 2. configure
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: "default",
    helpers: {
        ...helpers
    }
});

// 3. set engine and global values
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// 4. path to views
app.set('views', path.resolve('views'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(overrideMiddleware);
app.use(orderRoutes);
app.use(express.static(path.resolve('public')));

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


/* 
import express from 'express';
import bodyParser from 'body-parser';
import path, {dirname} from 'path';

import {fileURLToPath} from "url";
import {noteRoutes} from './routes/note-routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// eslint-disable-next-line import/prefer-default-export
export const app = express();

app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public')));

app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.sendFile("/html/index.html", {root: `${__dirname  }/public/`});
});

app.use("/notes", noteRoutes); */

/* import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const router = express.Router();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router); */