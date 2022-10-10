import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import './Details.css';

function Details() {
    // get the current store of movie objects from the movies reducer.
    const movie = useSelector(store => store.movieDetails);
    const movieGenres = useSelector(store => store.movieGenres);
    // setup history from useHistory()
    const history = useHistory();
    // setup dispatch from useDispatch()
    const dispatch = useDispatch();
    // get the movie id from the route url params
    let { movieId } = useParams(); 
    // console.log(movieId);

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
    }, []);

    // console.log(movie);

    if(movie === undefined) {
        return <h2>Movie not found</h2>
    }

    return (
        <section>
            <div className="details-container">
            <div className="details-box">
                <div>
                    <h1>{movie.title}</h1>
                    <img className="details-img" src={movie.poster}/>
                    <p className="movie-details">{movie.description}</p>
                </div>
                <div className="details-genres">
                    <h3>Genres:</h3>
                    {movieGenres.map(name => (
                        <p key={name.id}>{name.genre}</p>
                    ))}
                </div>
                <div className="details-btn">
                    <button onClick={() => history.push(`/edit/${movieId}`)}>Edit Movie</button>
                    <button onClick={() => history.push('/')}>Back to List</button>
                </div>
            </div>
            </div>
        </section>
    );
}

export default Details;