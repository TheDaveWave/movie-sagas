import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function EditGenre({name}) {
    // name prop is another 'name' for the current object of the movieGenres array 
    // in the parent EditMovie.jsx.
    const genres = useSelector(store => store.genres);
    const [editGenre, setEditGenre] = useState(false);
    const [selGenreId, setSelGenreId] = useState('');

    const dispatch = useDispatch();
    const { movieId } = useParams();
    // console.log(movieId);

    // remove a genre from the movie.
    const removeGenre = () => {
        // console.log(movieId);
        // console.log(name.genre_id);
        // create check to insure user does not delete all of the genres.
        if(genres.length === 1) {
            alert('Movie must have at least one genre.');
        } else {
            dispatch({
                type: 'REMOVE_MOVIE_GENRE',
                payload: {
                    movie_id: Number(movieId),
                    genre_id: Number(name.genre_id)
                }
            });
        } 
    }


    return (
        <>
            {editGenre ? 
            <>
                {/* <select className='genre-select' value={selGenreId} onChange={evt => setSelGenreId(Number(evt.target.value))}>
                    {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>  */}
                <button onClick={() => setEditGenre(false)}>Cancel</button>
                <button onClick={() => removeGenre()}>Delete</button>
            </> : 
            <button onClick={() => setEditGenre(true)}>Edit</button>}
        </>
    );
}

export default EditGenre;