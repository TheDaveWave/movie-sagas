import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './MovieForm.css';

function MovieForm() {
    // get the list of movies to check if movie exists.
    const movies = useSelector(store => store.movies);

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
        const exists = movies.find(movie => movie.title === titleInput);

        if(!titleInput || !urlInput || !descInput || !selGenreId) {
            alert('Please fill in all inputs');
        } else if (exists !== undefined) {
            alert('Movie already exists.');
        } else {
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
    }


    // fetch genres on page load.
    useEffect(() => {
        dispatch({type: 'GET_GENRES'});
        dispatch({type: 'FETCH_MOVIES'});
    }, []);

    return (
        <section>
            <header className='add-header'>
                <h1>Add New Movie</h1>
            </header>
            <div className='add-container'>
                <div className='add-box'>
                <div className='add-inputs'>
                    <input type='text' placeholder='Title' value={titleInput} onChange={evt => setTitleInput(evt.target.value)}/>
                    <input type='url' placeholder='Poster URL' value={urlInput} onChange={evt => setUrlInput(evt.target.value)}/>
                    <select className='genre-select' value={selGenreId} onChange={evt => setSelGenreId(Number(evt.target.value))}>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>
                </div>
                <hr />
                <div>
                <textarea id='form-text' name='form-text' rows='8' cols='50' value={descInput} onChange={evt => setDescInput(evt.target.value)}></textarea>
                </div>
                <div className='add-btn-box'>
                    <button onClick={() => history.push('/')}>Cancel</button>
                    <button onClick={() => saveMovie()}>Save</button>
                </div>
                </div>
            </div>
        </section>
    );
}

export default MovieForm;