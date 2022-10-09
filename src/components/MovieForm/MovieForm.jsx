import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function MovieForm() {
    // setup local state to capture input values.
    const [selGenreId, setSelGenreId] = useState('');
    const [titleInput, setTitleInput] = useState('');
    const [urlInput, setUrlInput] = useState('');
    const [descInput, setDescInput] = useState('');

    // get access to the store of genres.
    const genres = useSelector(store => store.genres);
    const dispatch = useDispatch();
    const history = useHistory();

    // define object to POST to database.
    const movieObj = {
        title: titleInput,
        poster: urlInput,
        description: descInput,
        genre_id: selGenreId
    }

    const saveMovie = () => {
        // add checks to ensure inputs are not empty.

        // dispatch new movie to sagas.
        dispatch({
            type: 'ADD_MOVIE',
            payload: movieObj
        });

        // reset inputs.
        setSelGenreId('');
        setTitleInput('');
        setUrlInput('');
        setDescInput('');

        // bring user to movie list page.
        history.push('/');
    }


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
                <input type='text' placeholder='Title' value={titleInput} onChange={evt => setTitleInput(evt.target.value)}/>
                <input type='url' placeholder='Poster URL' value={urlInput} onChange={evt => setUrlInput(evt.target.value)}/>
                <textarea id='form-text' name='form-text' rows='8' cols='50' value={descInput} onChange={evt => setDescInput(evt.target.value)}></textarea>
                <select className='genre-select' value={selGenreId} onChange={evt => setSelGenreId(Number(evt.target.value))}>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <button onClick={() => history.push('/')}>Cancel</button>
                <button onClick={() => saveMovie()}>Save</button>
            </div>
        </section>
    );
}

export default MovieForm;