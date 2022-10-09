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
    // console.log('movieDetails:', movieDetails.title, movieDetails.poster, movieDetails.description);

    // setup local state for inputs.
    const [selGenreId, setSelGenreId] = useState('');
    const [titleInput, setTitleInput] = useState(movieDetails.title);
    const [urlInput, setUrlInput] = useState(movieDetails.poster);
    const [descInput, setDescInput] = useState(movieDetails.description);

    // get the movie id from the route url params
    const {movieId} = useParams();
    // console.log(movieId);

    // define object to PUT / Update the database entry.
    const movieObj = {
        movieId: Number(movieId),
        title: titleInput,
        poster: urlInput,
        description: descInput,
    }

    // dispatch to put request to update the movie.
    const editMovie = () => {
        // check to see if data is valid before dispatching.
        if(!movieId || !titleInput || !poster || !descInput) {
            alert('Please fill in all inputs.');
        } else {
            dispatch({
                type: 'UPDATE_MOVIE',
                payload: movieObj
            });
            // push user back to details page.
            history.push(`/details/${movieId}`);
        }
    }

    console.log(movieObj);

    // function to add genre to current movie.
    const addNewGenre = () => {
        dispatch({
            type: 'GIVE_MOVIE_GENRE',
            payload: {
                movie_id: Number(movieId),
                genre_id: Number(selGenreId)
            }
        });
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
        // console.log(movieDetails);
        // set inputs to corresponding values.
        if(movieDetails.length > 0) {
            setTitleInput(movieDetails.title);
            setUrlInput(movieDetails.poster);
            setDescInput(movieDetails.description);
        }
        if(genres.length > 0) {
            setSelGenreId(genres[0].id);
        }
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
                                <EditGenre name={name}/>
                            </div>
                        </div>
                    ))}
                </div>
                <select className='genre-select' value={selGenreId} onChange={evt => setSelGenreId(Number(evt.target.value))}>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>
                <button onClick={() => addNewGenre()}>Add Genre</button>
                <div>
                    <button onClick={() => history.push(`/details/${movieId}`)}>Cancel</button>
                    <button onClick={()=> editMovie()}>Save</button>
                </div>
            </div>
        </section>
    );
}

export default EditMovie;