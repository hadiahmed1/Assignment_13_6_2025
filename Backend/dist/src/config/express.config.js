import express from "express";
import asyncHadnler from "../helper/asyncHandler";
import { getFilmDetails, getFilms } from "../controllers/film.controller";
import { getStoreDetails, getStores } from "../controllers/store.controller";
import cors from "cors";
import { addView } from "../controllers/view.controller";
const port = process.env.PORT || 3000;
const origin = process.env.FRONTEND_URL;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
}));
//---------routes------------------
app.get('/', asyncHadnler(async (_req, res) => {
    res.send('Hello World!');
}));
app.post('/films/:page', getFilms);
app.get('/film/:id', getFilmDetails);
app.get('/stores', getStores);
app.get('/stores/:id', getStoreDetails);
app.post('/view', addView);
//----------------------------------
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
