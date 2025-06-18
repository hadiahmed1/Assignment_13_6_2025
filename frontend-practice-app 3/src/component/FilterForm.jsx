import React, { memo } from 'react';
import { useForm } from 'react-hook-form';

const FilterForm=memo( function FilterForm({ setFilter, setPage }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        setFilter(data)
        setPage(1);
        console.log(data)
    };
    console.log(errors);

    return (
        <form className='flex' action="#" onSubmit={handleSubmit(onSubmit)}>
            <select className='p-1' {...register("sortby")}>
                <option value="title">title</option>
                <option value="release_year">release_year</option>
                <option value="language">language</option>
                <option value="length">length</option>
                <option value="rating">rating</option>
            </select>
            <select className='p-1' {...register("sort")}>
                <option value="asc">asc</option>
                <option value="desc">desc</option>
            </select>
            <select className='p-1' {...register("category")}>
                <option value="Action">Action</option>
                <option value="Animation">Animation</option>
                <option value="Children">Children</option>
                <option value="Classics">Classics</option>
                <option value="Comedy">Comedy</option>
                <option value="Documentary">Documentary</option>
                <option value="Drama">Drama</option>
                <option value="Family">Family</option>
                <option value="Foreign">Foreign</option>
                <option value="Games">Games</option>
                <option value="Horror">Horror</option>
                <option value="Music">Music</option>
                <option value="New">New</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Sports">Sports</option>
                <option value="Travel">Travel</option>
            </select>
            <select className='p-1' {...register("language")}>
                <option value="English">English</option>
                <option value="Italian">Italian</option>
                <option value="Japanese">Japanese</option>
                <option value="Mandarin">Mandarin</option>
                <option value="French">French</option>
                <option value="German">German</option>
            </select>
            <input className='p-1' type="number" placeholder="min_length" {...register("min_length", { min: 0 })} />
            <input className='p-1' type="number" placeholder="max_length" {...register("max_length", { min: 0 })} />

            <input className='bg-cyan-500 px-3 py-1 rounded-r-md hover:cursor-pointer' type="submit" />
        </form>
    );
})

export default FilterForm;