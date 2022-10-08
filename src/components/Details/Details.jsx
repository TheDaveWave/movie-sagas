import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Details() {
    // get the current store of movie objects from the movies reducer.
    const movie = useSelector(store => store.movieDetails);
    // setup dispatch from useDispatch()
    const dispatch = useDispatch();
    // get the movie id from the route url params
    let { movieId } = useParams(); 
    // console.log(movieId);

    // fetch the movie with the movieId from the params on load.
    useEffect(() => {
        dispatch({
            type: 'GET_MOVIE_DEETS',
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
            </div>
        </section>
    );
}

export default Details;