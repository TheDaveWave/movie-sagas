import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Details() {
    // get the current store of movie objects from the movies reducer.
    const movie = useSelector(store => store.movieDetails);
    const movieGenres = useSelector(store => store.movieGenres);
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
            <div>
                <h1>This is the details page.</h1>
                <h2>{movie.title}</h2>
                <img src={movie.poster}/>
                <p>{movie.description}</p>
                <p>Genres:</p>
                {movieGenres.map(name => (
                    <p>{name.genre}</p>
                ))}
            </div>
        </section>
    );
}

export default Details;