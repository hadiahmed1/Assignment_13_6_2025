import express from "express";
import asyncHadnler from "../helper/asyncHandler";
import { getFilmDetails, getFilms } from "../controllers/film.controller";
import { getStoreDetails, getStores } from "../controllers/store.controller";
import cors from "cors"
import prisma from "./prisma.config";
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
}));
//---------routes------------------
app.get('/', asyncHadnler(
    async (req, res) => {
        res.send('Hello World!')
    })
);

app.post('/films/:page',getFilms);
app.get('/film/:id',getFilmDetails);
app.get('/stores',getStores);
app.get('/stores/:id',getStoreDetails);

//----------------------------------


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
