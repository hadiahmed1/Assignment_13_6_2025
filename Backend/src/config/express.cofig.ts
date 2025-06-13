import express from "express";
import asyncHadnler from "../helper/asyncHandler";
import { getFilms } from "../controllers/film.controller";

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//---------routes------------------
app.get('/', asyncHadnler(
    async (req, res) => {
        res.send('Hello World!')
    })
);

app.get('/film',getFilms)



//----------------------------------


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
