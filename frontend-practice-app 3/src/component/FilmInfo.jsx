import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const FilmInfo = ({id}) => {
    const [film, setFilm] = useState(null);
    useEffect(() => {
        console.log("effect")
        axiosInstance.get(`/film/${id}`)

            .then(res => {
                console.log(res);

                setFilm(res.data.data.film)
            });
    }, [id]);

    return (
        film && <div className="text-black">
            <h2 className="text-6xl">Title: {film.title}</h2>
            <ul>
                <li>Released In: {film.release_year}</li>
                <li>Length: {film.length}</li>
                <li>Rating: {film.rating}</li>
                <li>Description: {film.description}</li>
                <li>
                    <strong>Actors</strong>
                    <ol className="px-9">
                        {
                            film.film_actor.map(actor => {
                                return <li>{actor.actor.first_name + " " + actor.actor.last_name}</li>
                            })}
                    </ol>

                </li>
            </ul>
        </div>)
}

export default FilmInfo;








// "message": "ACE GOLDFINGER",
// "statusCode": 200,
// "data": {
//     "film": {
//         "film_id": 2,
//         "title": "ACE GOLDFINGER",
//         "release_year": 2006,
//         "length": 48,
//         "replacement_cost": "12.99",
//         "rating": "G",
//         "description": "A Astounding Epistle of a Database Administrator And a Explorer who must Find a Car in Ancient China",
//         "film_actor": [
//             {
//                 "actor": {
//                     "actor_id": 19,
//                     "first_name": "BOB",
//                     "last_name": "FAWCETT",
//                     "last_update": "2006-02-15T04:34:33.000Z"
//                 }
//             },
//             {
//                 "actor": {
//                     "actor_id": 85,
//                     "first_name": "MINNIE",
//                     "last_name": "ZELLWEGER",
//                     "last_update": "2006-02-15T04:34:33.000Z"
//                 }
//             },
//             {
//                 "actor": {
//                     "actor_id": 90,
//                     "first_name": "SEAN",
//                     "last_name": "GUINESS",
//                     "last_update": "2006-02-15T04:34:33.000Z"
//                 }
//             },
//             {
//                 "actor": {
//                     "actor_id": 160,
//                     "first_name": "CHRIS",
//                     "last_name": "DEPP",
//                     "last_update": "2006-02-15T04:34:33.000Z"
//                 }
//             }
//         ],
//         "film_category": [
//             {
//                 "category": {
//                     "category_id": 11,
//                     "name": "Horror",
//                     "last_update": "2006-02-15T04:46:27.000Z"
//                 }
//             }
//         ],
//         "rental_rate": "4.99",
//         "inventory": [
//             {
//                 "inventory_id": 9,
//                 "film_id": 2,
//                 "store_id": 2,
//                 "last_update": "2006-02-15T05:09:17.000Z"
//             },
//             {
//                 "inventory_id": 10,
//                 "film_id": 2,
//                 "store_id": 2,
//                 "last_update": "2006-02-15T05:09:17.000Z"
//             },
//             {
//                 "inventory_id": 11,
//                 "film_id": 2,
//                 "store_id": 2,
//                 "last_update": "2006-02-15T05:09:17.000Z"
//             }
//         ],
//         "language_film_language_idTolanguage": {
//             "name": "English"
//         }
//     }
// }