import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import EditGenre from "./EditGenre";

function EditMovie() {
    // use object destructuring to pull out reducers from store.
    const { movieDetails, movieGenres, genres } = useSelector(store => store);
    const dispatch = useDispatch();
    const history = useHistory();
    
    // setup local state for inputs.
    const [selGenreId, setSelGenreId] = useState('');
    const [titleInput, setTitleInput] = useState('');
    const [urlInput, setUrlInput] = useState('');
    const [descInput, setDescInput] = useState('');

    // get the movie id from the route url params
    let {movieId} = useParams();
    // console.log(movieId);

    // define object to PUT / Update the database entry.
    const movieObj = {
        title: titleInput,
        poster: urlInput,
        description: descInput,
        genre_id: selGenreId
    }

    useEffect(() => {
        // fetch the movie with the movieId from the params on load.
        dispatch({
            type: 'GET_MOVIE_DEETS',
            payload: Number(movieId)
        });
        // fetch the genres for the movieId on load.
        dispatch({
            type: 'GET_MOVIE_GENRES',
            payload: Number(movieId)
        });
        dispatch({type: 'GET_GENRES'});

        // set inputs to corresponding values.
        setTitleInput(movieDetails.title);
        setUrlInput(movieDetails.poster);
        setDescInput(movieDetails.description);
    }, []);

    return (
        <section>
            <h1>EDIT THIS!</h1>
            <div>
                <input type='text' placeholder='Title' value={titleInput} onChange={evt => setTitleInput(evt.target.value)}/>
                <img src={movieDetails.poster}/>
                <input type='url' placeholder='Poster URL' value={urlInput} onChange={evt => setUrlInput(evt.target.value)}/>
                <textarea id='form-text' name='form-text' rows='8' cols='50' value={descInput} onChange={evt => setDescInput(evt.target.value)}></textarea>
                <div>
                    <p>Genres:</p>
                    {movieGenres.map(name => (
                        <div key={name.id}>
                            <div>{name.genre} {' '}
                                <EditGenre genres={genres}/>
                            </div>
                        </div>
                    ))}
                </div>
                <select className='genre-select' value={selGenreId} onChange={evt => setSelGenreId(Number(evt.target.value))}>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>
                <button>Add Genre</button>
                <div>
                    <button onClick={() => history.push(`/details/${movieId}`)}>Cancel</button>
                </div>
            </div>
        </section>
    );
}

export default EditMovie;