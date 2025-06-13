import express from "express";
import ApiError from "../helper/ApiError";
import asyncHadnler from "../helper/asyncHandler";

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




//----------------------------------


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
