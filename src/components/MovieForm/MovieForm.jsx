import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function MovieForm() {
    // setup local state to capture input values.
    const [selGenreId, setSelGenreId] = useState('');

    // get access to the store of genres.
    const genres = useSelector(store => store.genres);

    const dispatch = useDispatch();



    // fetch genres on page load.
    useEffect(() => {
        dispatch({type: 'GET_GENRES'});
    }, []);

    return (
        <section>
            <div>
                <h1>This is the Movie Form!</h1>
            </div>
            <div>
                <input type='text' placeholder='Title'/>
                <input type='url' placeholder='Poster URL'/>
                <textarea rows='8' cols='50'></textarea>
                <select id='genre-select' value={selGenreId} onChange={evt => setSelGenreId(Number(evt.target.value))}>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <button>Cancel</button>
                <button>Save</button>
            </div>
        </section>
    );
}

export default MovieForm;