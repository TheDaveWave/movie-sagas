import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function EditGenre({genre}) {
    const genres = useSelector(store => store.genres);
    const [editGenre, setEditGenre] = useState(false);
    const [selGenreId, setSelGenreId] = useState('');

    const { movieId } = useParams();
    const dispatch = useDispatch();
    console.log(movieId);

    // remove a genre from the movie.
    const removeGenre = () => {
        dispatch({
            type: 'REMOVE_MOVIE_GENRE',
            payload: {
                movie_id: Number(movieId),
                genre_id: Number(genre.id)
            }
        });
    }


    return (
        <>
            {editGenre ? 
            <>
                <select className='genre-edit' value={selGenreId} onChange={evt => setSelGenreId(Number(evt.target.value))}>
                    {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select> 
                <button onClick={() => removeGenre()}>Delete</button>
                <button onClick={() => setEditGenre(false)}>Cancel</button>
            </> : 
            <button onClick={() => setEditGenre(true)}>Edit</button>}
        </>
    );
}

export default EditGenre;